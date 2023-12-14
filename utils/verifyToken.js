const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.id;
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({ message: "Unauthorized" });
	}
};

module.exports = verifyToken;
