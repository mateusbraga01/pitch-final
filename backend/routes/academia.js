const express = require('express');
const router = express.Router();
const AcademiaController = require('../controllers/AcademiaController');

router.post('/add-academia', AcademiaController.addAcademia);
router.delete('/delete-academia/:id', AcademiaController.deleteAcademia);

module.exports = router;
