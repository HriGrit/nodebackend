const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = require("../config/nodemailer");
const generateToken = require("../utils/generateToken");
const verifyToken = require("../utils/verifyToken");

const createUserController = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	try {
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		} else {
			const person = await User.findOne({ username: name });
			if (person) {
				return res
					.status(400)
					.json({ message: "Username already exists" });
			}
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username: name,
			email,
			password: hashedPassword,
		});

		await newUser.save();
		console.log(generateToken(newUser._id));
		res.status(201).json({ message: "User created successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const loginUserController = async (req, res) => {
	const { name, password } = req.body;

	if (!name || !password) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	try {
		const user = await User.findOne({ username: name });
		console.log(user);
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		console.log(generateToken(user._id));
		res.status(200).json({ message: "Logged in successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const forgotUserController = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1hr",
		});
		console.log(token);
		const resetURL = `http://localhost:1313/api/reset-password/${token}`;

		const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

		const object = {
			email: user.email,
			subject: "Your password reset token (valid for 10 min)",
		};

		await sendEmail(object);
		res.status(200).json({ message: "Token sent to email!" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const resetPasswordController = async (req, res) => {
	const { token } = req.params;
	const { password, passwordConfirm } = req.body;

	if (!password || !passwordConfirm) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user.password = hashedPassword;

		await user.save();

		res.status(200).json({ message: "Password updated successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	createUserController,
	loginUserController,
	forgotUserController,
	resetPasswordController,
};
