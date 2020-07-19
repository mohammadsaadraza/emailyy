const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Users", userSchema);
