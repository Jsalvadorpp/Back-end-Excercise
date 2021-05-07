const { Schema, model } = require('mongoose');
const availableCountries = require('../utils/availableCountries');
const currencies = require('../utils/availableCurrencies');

const currencyFormatSchema = new Schema(
	{
		currencyAfterPrice: Boolean,
		showCents: Boolean,
		thousandDelimeter: {
			type: String,
			enum: [ 'dot', 'comma' ]
		},
		currencyDisplay: {
			type: String,
			enum: [ 'code', 'symbol' ]
		},
		marketCountry: {
			type: String,
			enum: availableCountries
		},
		currency: {
			type: String,
			enum: currencies.availabe
		}
	},
	{ timestamps: true }
);

module.exports = model('CurrencyFormat', currencyFormatSchema);
