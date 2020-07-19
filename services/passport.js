const passport = require("passport");
const GoogleSrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new GoogleSrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				var user = await User.findOne({
					googleId: profile.id,
				});

				if (!user) {
					user = await User.create({
						googleId: profile.id,
					});
				}
				done(null, user);
			} catch (err) {
				console.log(err.message);
			}
		}
	)
);
