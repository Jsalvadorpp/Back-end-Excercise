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
	res.send({
		type: 'Success',
		message: 'entry created successfully in database',
		data: {}
	});
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
