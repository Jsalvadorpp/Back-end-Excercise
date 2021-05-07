const CurrencyFormat = require('../models/currencyFormats');

exports.getAllFormats = async (req, res) => {
	try {
		const currencyFormats = await CurrencyFormat.find({});
		let data = { currencyFormats };

		res.send({ type: 'Success', message: 'data obtained', data });
	} catch (error) {
		console.log(`[Error] - ${error}`);
		res.send({ type: 'Error', message: 'Error in getting the data' });
	}
};

exports.getFormatByCountry = async (req, res) => {
	res.send({
		type: 'Success',
		message: 'data obtained',
		data: {}
	});
};

exports.createFormat = async (req, res) => {
	let formatAlreadyExists = await CurrencyFormat.findOne({
		marketCountry: req.body.marketCountry,
		currency: req.body.currency
	});

	//prevents duplicate entries
	if (formatAlreadyExists) {
		return res.send({
			type: 'Error',
			message: 'The format with the selected country and currency already exist in the database'
		});
	}

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
