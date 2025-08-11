const { PlanoAcademico, Escola } = require('../models');

// Create a new PlanoAcademico
exports.createPlanoAcademico = async (req, res) => {
  try {
    // Optional: Check if the escolaId exists before creating
    const escola = await Escola.findByPk(req.body.escolaId);
    if (!escola) {
      return res.status(404).json({ error: 'Escola not found' });
    }
    const plano = await PlanoAcademico.create(req.body);
    res.status(201).json(plano);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all PlanosAcademicos (optionally filtered by escolaId)
exports.getAllPlanosAcademicos = async (req, res) => {
  try {
    const where = {};
    if (req.query.escolaId) {
      where.escolaId = req.query.escolaId;
    }
    const planos = await PlanoAcademico.findAll({ where });
    res.status(200).json(planos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single PlanoAcademico by ID
exports.getPlanoAcademicoById = async (req, res) => {
  try {
    const plano = await PlanoAcademico.findByPk(req.params.id);
    if (plano) {
      res.status(200).json(plano);
    } else {
      res.status(404).json({ error: 'PlanoAcademico not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a PlanoAcademico
exports.updatePlanoAcademico = async (req, res) => {
  try {
    const [updated] = await PlanoAcademico.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPlano = await PlanoAcademico.findByPk(req.params.id);
      res.status(200).json(updatedPlano);
    } else {
      res.status(404).json({ error: 'PlanoAcademico not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a PlanoAcademico
exports.deletePlanoAcademico = async (req, res) => {
  try {
    const deleted = await PlanoAcademico.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'PlanoAcademico not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
