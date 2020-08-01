const router = require("express").Router();
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = require("../models/Survey");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

router.route("/api/surveys/:surveyId/:choice").get((req, res) => {
	res.send("Thanks for voting!");
});

router.route("/api/surveys/webhook").post((req, res) => {
	const p = new Path("/api/surveys/:surveyId/:choice");

	const events = req.body
		.filter((event) => {
			if (event.ip.startsWith("66.")) {
				return false;
			}
			return true;
		})
		.map((event) => {
			const match = p.test(new URL(event.url).pathname);

			if (match) {
				return { ...match, email: event.email };
			}
		});
	console.log(events);

	_.chain(events)
		.compact()
		.uniqBy("email", "surveyId")
		.each(({ surveyId, email, choice }) => {
			console.log({
				surveyId,
				email,
				choice,
			});
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false },
					},
				},
				{
					$inc: { [choice]: 1 },
					$set: { "recipients.$.responded": true },
				}
			).exec();
		});

	res.status(200).send({});
});

router
	.route("/api/surveys")
	.get(requireLogin, async (req, res) => {
		const userSurveys = await Survey.find({
			_user: req.user.id,
		}).select({ recipients: false });

		res.send(userSurveys);
	})
	.post([
		requireLogin,
		requireCredits,
		async (req, res) => {
			const { title, subject, body, recipients } = req.body;

			//SETTING UP SURVEY RECORD FOR MONGO
			const survey = new Survey({
				title,
				subject,
				body,
				recipients: recipients
					.replace(/,+$/, "")
					.split(",")
					.map((email) => ({ email: email.trim() })),
				_user: req.user.id,
				dateSent: Date.now(),
			});

			//MAILING RECIPIENTS
			const { mailerObject, configObject } = Mailer(
				survey,
				surveyTemplate(survey)
			);

			try {
				await mailerObject.send(configObject);

				await survey.save();

				req.user.credits -= 1;
				const user = await req.user.save();

				return res.send(user);
			} catch (error) {
				return res.status(422).send(error);
			}
		},
	]);

module.exports = router;
