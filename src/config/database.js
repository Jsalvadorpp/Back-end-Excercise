const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then((db) => {
		console.log(`[log] Database connected`);
	})
	.catch((err) => console.log('[error]' + err));
