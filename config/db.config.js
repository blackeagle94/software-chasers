const mongoose = require('mongoose');
require('dotenv').config()

module.exports = () => {
	mongoose.connect(
		process.env.db_connection, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true }
	);

	mongoose.connection.on('open', () => {
		console.log('DB connection established');
	});

	mongoose.connection.on('error', (err) => {
		console.log('Connection failed' + err);
	});
};
