const mongoose = require("mongoose");
const keys = require("./keys");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(keys.mongoURI, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true,
		});
		console.log(
			`MongoDB connected: ${conn.connection.host}`.red.underline.bold
		);
	} catch (err) {
		console.log(`Error: ${err.message}`.red.bold);
		process.exit(1);
	}
};
module.exports = connectDB;
