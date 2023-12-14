const express = require("express");
const postRoute = express.Router();
const verifyToken = require("../utils/verifyToken");

const {
	createpostController,
	getpostsController,
	getUserpostsController,
	likepostController,
} = require("../controllers/postController");

postRoute.post("/create", verifyToken, createpostController);
postRoute.get("/user", verifyToken, getUserpostsController);
postRoute.get("/all", getpostsController);
postRoute.patch("/liked/:id", verifyToken, likepostController);

module.exports = postRoute;
