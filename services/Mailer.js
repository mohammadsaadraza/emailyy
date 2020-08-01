const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
const surveyTemplate = require("./emailTemplates/surveyTemplate");
sgMail.setApiKey(keys.sendGridKey);

const Mailer = ({ subject, recipients }, template) => {
	const msg = {
		to: recipients,
		from: "emaily.dev.app@gmail.com",
		subject: subject,
		isMultiple: true,
		html: template,
		trackingSettings: {
			clickTracking: {
				enable: true,
			},
		},
	};
	return {
		configObject: msg,
		mailerObject: sgMail,
	};
};

// class Mailer extends helper.Mail {
// 	constructor({ subject, recipients }, content) {
// 		super();

// 		this.sgApi = sendgrid(keys.sendGridKey);
// 		this.from_email = new helper.Email("mraza.bese17seecs@seecs.edu.pk");
// 		this.subject = subject;
// 		this.body = new helper.Content("text/html", content);
// 		this.recipients = this.formatAddresses(recipients);

// 		this.addContent(this.body);
// 		this.addClickTracking();
// 		this.addRecipients();
// 	}

// 	formatAddresses(recipients) {
// 		return recipients.map(({ email }) => {
// 			return new helper.Email(email);
// 		});
// 	}

// 	addClickTracking() {
// 		const trackingSettings = new helper.TrackingSettings();
// 		const clickTracking = new helper.ClickTracking(true, true);

// 		trackingSettings.setClickTracking(clickTracking);
// 		this.addTrackingSettings(trackingSettings);
// 	}

// 	addRecipients() {
// 		const personalize = new helper.Personalization();
// 		this.recipients.forEach((recipient) => {
// 			personalize.addTo(recipient);
// 		});

// 		this.addPersonalization(personalize);
// 	}

// 	async send() {
// 		const request = this.sgApi.emptyRequest({
// 			method: "POST",
// 			path: "v3/mail/send",
// 			body: this.toJSON(),
// 		});

// 		const response = this.sgApi.API(request);
// 		return response;
// 	}
// }

module.exports = Mailer;
