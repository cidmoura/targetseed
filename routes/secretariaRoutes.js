const express = require('express');
const router = express.Router();
const secretariaController = require('../controllers/secretariaController');

// Routes for /api/secretarias
router.post('/', secretariaController.createSecretaria);
router.get('/', secretariaController.getAllSecretarias);
router.get('/:id', secretariaController.getSecretariaById);
router.put('/:id', secretariaController.updateSecretaria);
router.delete('/:id', secretariaController.deleteSecretaria);

module.exports = router;
