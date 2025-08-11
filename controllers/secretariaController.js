const { Secretaria } = require('../models');

// Create a new Secretaria
exports.createSecretaria = async (req, res) => {
  try {
    const secretaria = await Secretaria.create(req.body);
    res.status(201).json(secretaria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Secretarias
exports.getAllSecretarias = async (req, res) => {
  try {
    const secretarias = await Secretaria.findAll();
    res.status(200).json(secretarias);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Secretaria by ID
exports.getSecretariaById = async (req, res) => {
  try {
    const secretaria = await Secretaria.findByPk(req.params.id);
    if (secretaria) {
      res.status(200).json(secretaria);
    } else {
      res.status(404).json({ error: 'Secretaria not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Secretaria
exports.updateSecretaria = async (req, res) => {
  try {
    const [updated] = await Secretaria.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSecretaria = await Secretaria.findByPk(req.params.id);
      res.status(200).json(updatedSecretaria);
    } else {
      res.status(404).json({ error: 'Secretaria not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Secretaria
exports.deleteSecretaria = async (req, res) => {
  try {
    const deleted = await Secretaria.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Secretaria not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
