const express = require('express');
const db = require('./models');

// Import routes
const secretariaRoutes = require('./routes/secretariaRoutes');
const planoAcademicoRoutes = require('./routes/planoAcademicoRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/secretarias', secretariaRoutes);
app.use('/api/planos-academicos', planoAcademicoRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  db.sequelize.authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

module.exports = app; // Export the app for testing
