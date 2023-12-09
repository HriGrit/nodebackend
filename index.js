const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConnect = require("./config/dbConnect");
dbConnect();

const userRoute = require("./routes/userRoutes");

app.use("/api", userRoute);

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
	console.log(`helloworld: listening on port ${port}`);
});
