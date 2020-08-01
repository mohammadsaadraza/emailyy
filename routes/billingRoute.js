const router = require("express").Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

router.post("/api/stripe", [
	requireLogin,
	async (req, res) => {
		try {
			const charge = await stripe.charges.create({
				amount: 500,
				currency: "usd",
				description: "$5 for 5 credits",
				source: req.body.id,
			});

			req.user.credits += 5;
			const user = await req.user.save();

			res.send(user);
		} catch (error) {
			return res.status(400).send({
				error: "Transaction failed",
			});
		}
	},
]);

module.exports = router;
