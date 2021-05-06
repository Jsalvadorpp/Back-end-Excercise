const mongoose = require('mongoose');
const mongoURI = process.env.APP_MODE == 'local' ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI_PROD;
const dbType = process.env.APP_MODE == 'local' ? 'Dev' : 'Prod';

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then((db) => {
		console.log(`Database connected - ${dbType}`);
	})
	.catch((err) => console.log(err));
