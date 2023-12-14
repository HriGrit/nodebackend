const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");
const User = require("../models/userSchema");

const createcommentController = async (req, res) => {
	const { title, body } = req.body;
	if (!title || !body) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	try {
		const user = await User.findById(req.user).select("-password");
		const post = await Post.findById(req.params.id);

		const newComment = new Comment({
			title,
			body,
			user: user,
			post: req.params.id,
		});

		const savedComment = await newComment.save();
		post.comments.push(savedComment);
		await post.save();
		res.json(savedComment);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deletecommentController = async (req, res) => {
	try {
		const com = await Comment.findById(req.params.id);
		if (!com) {
			return res.status(404).json({ msg: "Comment not found" });
		}
		const post = await Post.findById(com.post);
		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}
		const user = await User.findById(post.user);
		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}
		console.log(user, req.user);
		// if (user !== req.user) {
		// 	return res.status(401).json({ msg: "User not authorized" });
		// }
		await Comment.findByIdAndRemove(com);
		res.json({ msg: "Comment deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updatecommentController = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		if (!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}
		if (comment.user.toString() !== req.user) {
			return res.status(401).json({ msg: "User not authorized" });
		}
		const { title, body } = req.body;
		if (!title || !body) {
			return res.status(400).json({ msg: "Please enter all fields" });
		}
		comment.title = title;
		comment.body = body;
		await comment.save();
		res.json(comment);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getcommentController = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		if (!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}
		res.json(comment);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getAllcommentController = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}
		const comments = await Comment.find({ post: req.params.id });
		res.json(comments);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createcommentController,
	deletecommentController,
	updatecommentController,
	getcommentController,
	getAllcommentController,
};
