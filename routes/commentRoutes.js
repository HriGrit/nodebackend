const express = require("express");
const commentRoute = express.Router();

const {
	createcommentController,
	deletecommentController,
	updatecommentController,
	getcommentController,
	getAllcommentController,
} = require("../controllers/commentController");

const verifyToken = require("../utils/verifyToken");

commentRoute.post("/create/:id", verifyToken, createcommentController);
commentRoute.delete("/delete/:id", deletecommentController);
commentRoute.patch("/update/:id", updatecommentController);
commentRoute.get("/get/:id", getcommentController);
commentRoute.get("/get", getAllcommentController);

module.exports = commentRoute;
