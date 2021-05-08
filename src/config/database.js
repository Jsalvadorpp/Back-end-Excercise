const mongoose = require('mongoose');
const mongoURI = process.env.NODE_ENV == 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then((db) => {
		/* istanbul ignore next */
		console.log(`[log] Database connected ${process.env.NODE_ENV == 'test' ? '- test' : ''}`);
	})
	.catch((err) => {
		/* istanbul ignore next */
		console.log('[error]' + err);
	});
