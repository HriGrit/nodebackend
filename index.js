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
		origin: "https://nodebackend-silk.vercel.app",
	})
);

app.listen(1313, () => {
	console.log("Server running on port 1313");
});
