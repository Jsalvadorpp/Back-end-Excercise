var express = require('express');
var router = express.Router();
const currencyFormat = require('../controllers/currencyFormat.controller');

router.get('/currencyFormats', currencyFormat.getAllFormats);
router.get('/currencyFormat', currencyFormat.getFormatByCountry);
router.post('/currencyFormat', currencyFormat.createFormat);
router.put('/currencyFormat', currencyFormat.updateFormat);
router.delete('/currencyFormat', currencyFormat.removeFormat);

module.exports = router;
