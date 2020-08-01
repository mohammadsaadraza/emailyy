const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const billingRoute = require("./routes/billingRoute");
const surveyRoute = require("./routes/surveyRoutes");
const keys = require("./config/keys");

connectDB();
require("./services/passport");
const app = express();

//setup
app.use(morgan("dev"));
app.use(express.json());
// app.use(bodyParser())

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(authRoute);
app.use(billingRoute);
app.use(surveyRoute);

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started at PORT ${PORT}`.blue.bold);
});
