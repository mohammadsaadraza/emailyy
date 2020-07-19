const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const keys = require("./config/keys");

connectDB();
require("./services/passport");
const app = express();

//setup
app.use(morgan("dev"));
app.use(express.json());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started at PORT ${PORT}`.blue.bold);
});
