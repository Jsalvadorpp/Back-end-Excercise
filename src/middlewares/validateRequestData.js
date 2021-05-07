// validates the field coming from the client
// if the fields are not valid then return error displaying what fields are wrong
// the schema input is a schema validation coming from the route file

exports.validateRequest = async (req, res, next, schema) => {
	if (schema.error) {
		let info = schema.error.details[0];
		console.log(`[Error] - ${info.message}`);
		res.send({ type: 'Error', message: info.message });
	} else {
		next();
	}
};
