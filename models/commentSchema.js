const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "post",
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
