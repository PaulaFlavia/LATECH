// ************ Rquerimentos ************
const express = require('express');
const router = express.Router();

// ************ Controller ************
const productsController = require('../controllers/productsController');


/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', productsController.update);

module.exports = router;
