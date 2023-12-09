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

const PORT = process.env.PORT || 1313;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
