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
	try {
		const currencyFormats = await CurrencyFormat.find({ marketCountry: req.query.country });
		let data = { currencyFormats };

		res.send({ type: 'Success', message: 'data obtained', data });
	} catch (error) {
		console.log(`[Error] - ${error}`);
		res.send({ type: 'Error', message: 'Error in getting the data' });
	}
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
	try {
		let formatToUpdate = await CurrencyFormat.findOne({
			marketCountry: req.body.marketCountry,
			currency: req.body.currency
		});

		if (formatToUpdate) {
			// update fields
			formatToUpdate.currencyAfterPrice = req.body.currencyAfterPrice;
			formatToUpdate.showCents = req.body.showCents;
			formatToUpdate.thousandDelimeter = req.body.thousandDelimeter;
			formatToUpdate.currencyDisplay = req.body.currencyDisplay;

			await formatToUpdate.save();
			let data = { currencyFormat: formatToUpdate };

			res.send({ type: 'Success', message: 'entry updated successfully in database', data });
		} else {
			res.send({ type: 'Error', message: 'this currency format does not exist' });
		}
	} catch (error) {
		console.log(`[Error] - ${error}`);
		res.send({ type: 'Error', message: 'Error in updating the format' });
	}
};

exports.removeFormat = async (req, res) => {
	try {
		let formatToDelete = await CurrencyFormat.findOne({
			marketCountry: req.body.country,
			currency: req.body.currency
		});

		if (formatToDelete) {
			await formatToDelete.remove();
			res.send({ type: 'Success', message: 'entry removed from database' });
		} else {
			res.send({ type: 'Error', message: 'this currency format does not exist' });
		}
	} catch (error) {
		console.log(`[Error] - ${error}`);
		res.send({ type: 'Error', message: 'Error in deleting the entry from the database' });
	}
};
