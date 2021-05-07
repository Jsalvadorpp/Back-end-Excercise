const CurrencyFormat = require('../models/currencyFormats');

exports.getAllFormats = async (req, res) => {
	res.send({
		type: 'Success',
		message: 'data obtained',
		data: {}
	});
};

exports.getFormatByCountry = async (req, res) => {
	res.send({
		type: 'Success',
		message: 'data obtained',
		data: {}
	});
};

exports.createFormat = async (req, res) => {
	try {
		let newCurrencyFormat = new CurrencyFormat(req.body);
		await newCurrencyFormat.save();

		let data = {
			currencyFormat: newCurrencyFormat
		};

		res.send({ type: 'Success', message: 'entry created successfully in database', data });
	} catch (error) {
		console.log(`[Error] - ${error}`);
		res.send({ type: 'Error', message: 'Error in creating the format' });
	}
};

exports.updateFormat = async (req, res) => {
	res.send({
		type: 'Success',
		message: 'entry updated successfully in database',
		data: {}
	});
};
exports.removeFormat = async (req, res) => {
	res.send({
		type: 'Success',
		message: 'entry removed from database',
		data: {}
	});
};
