var express = require('express');
var router = express.Router();
const Joi = require('joi');
const currencyFormat = require('../controllers/currencyFormat.controller');
const { validateRequest } = require('../middlewares/validateRequestData');
const availableCountries = require('../utils/availableCountries');
const currencies = require('../utils/availableCurrencies');

// routes
router.get('/currencyFormats', currencyFormat.getAllFormats);
router.get('/currencyFormat', currencyFormat.getFormatByCountry);
router.post('/currencyFormat', createFormatSchema, currencyFormat.createFormat);
router.put('/currencyFormat', currencyFormat.updateFormat);
router.delete('/currencyFormat', currencyFormat.removeFormat);

// check input before going to the controller
function createFormatSchema(req, res, next) {
	const schema = Joi.object({
		currencyAfterPrice: Joi.boolean().required(),
		showCents: Joi.boolean().required(),
		thousandDelimeter: Joi.string().valid('dot', 'comma').required(),
		currencyDisplay: Joi.string().valid('code', 'symbol').required(),
		marketCountry: Joi.string().valid(...availableCountries),
		currency: Joi.string().valid(...currencies.availabe)
	});

	validateRequest(req, res, next, schema.validate(req.body));
}

module.exports = router;
