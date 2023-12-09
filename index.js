const express = require("express");
const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: "https://nodebackend-silk.vercel.app",
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConnect = require("./config/dbConnect");
dbConnect();

const userRoute = require("./routes/userRoutes");

app.use("/api", userRoute);
app.get("/", (req, res) => {
	res.send("Hello World");
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
	console.log(`helloworld: listening on port ${port}`);
});
