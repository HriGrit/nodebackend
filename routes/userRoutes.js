const express = require("express");
const userRoute = express.Router();

const {
	createUserController,
	loginUserController,
	forgotUserController,
	resetPasswordController,
} = require("../controllers/userController");

userRoute.post("/create-user", createUserController);

userRoute.post("/login-user", loginUserController);

userRoute.post("/forget-user", forgotUserController);

userRoute.patch("/reset-password/:token", resetPasswordController);

module.exports = userRoute;
