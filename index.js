const express = require("express");
const colors = require("colors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started at PORT ${PORT}`.blue.bold);
});
