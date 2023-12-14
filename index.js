const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConnect = require("./config/dbConnect");
dbConnect();

const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const commentRoute = require("./routes/commentRoutes");

app.get("/", (req, res) => {
	res.send("Hello World");
});
app.use("/api", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`helloworld: listening on port ${port}`);
});
