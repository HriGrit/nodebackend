const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+\@.+\..+/, "Please enter a valid email address"],
	},
	password: {
		type: String,
		required: true,
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
