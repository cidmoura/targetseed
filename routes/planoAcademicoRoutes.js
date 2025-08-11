const express = require('express');
const router = express.Router();
const planoAcademicoController = require('../controllers/planoAcademicoController');

// Routes for /api/planos-academicos
router.post('/', planoAcademicoController.createPlanoAcademico);
router.get('/', planoAcademicoController.getAllPlanosAcademicos);
router.get('/:id', planoAcademicoController.getPlanoAcademicoById);
router.put('/:id', planoAcademicoController.updatePlanoAcademico);
router.delete('/:id', planoAcademicoController.deletePlanoAcademico);

module.exports = router;
