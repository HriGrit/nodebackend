const Post = require("../models/postSchema");
const User = require("../models/userSchema");

const createpostController = async (req, res) => {
	try {
		const { title, body } = req.body;
		if (!title || !body) {
			return res.status(400).json({ msg: "Please enter all fields" });
		}

		const user = await User.findById(req.user).select("-password");
		const newPost = new Post({
			title,
			body,
			user: user._id, // Associate the post with the user
		});

		const savedPost = await newPost.save();
		user.posts.push(savedPost._id);
		await user.save();

		res.json(savedPost);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserpostsController = async (req, res) => {
	try {
		const user = await User.findById(req.user).select("-password");
		const posts = await Post.find({ user: user._id });
		res.json(posts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getpostsController = async (req, res) => {
	try {
		const posts = await Post.find().populate("user", "-password");
		res.json(posts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const likepostController = async (req, res) => {
	try {
		const user = await User.findById(req.user).select("-password");
		const post = await Post.findById(req.params.id);

		if (!post.likes.includes(user._id)) {
			await post.updateOne({ $push: { likes: user._id } });
			res.json({ msg: "Post liked" });
		} else {
			await post.updateOne({ $pull: { likes: user._id } });
			res.json({ msg: "Post unliked" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createpostController,
	getpostsController,
	getUserpostsController,
	likepostController,
};
