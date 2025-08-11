const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register a new user
exports.register = async (req, res) => {
  try {
    // For now, we allow creating any role.
    // In a real app, this should be protected and restricted based on the logged-in user's role.
    const user = await User.create(req.body);
    // Do not send password back, even the hash
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    // Handle validation errors (e.g., duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Use a more secure secret from environment variables
    const JWT_SECRET = process.env.JWT_SECRET || 'a-very-secret-and-secure-key-that-is-long';
    if (JWT_SECRET === 'a-very-secret-and-secure-key-that-is-long') {
        console.warn("Using default JWT secret. Please set a JWT_SECRET environment variable for production.");
    }

    // Sign a JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
