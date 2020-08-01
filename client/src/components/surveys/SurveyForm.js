import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
	renderFields() {
		return formFields.map(({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	render() {
		return (
			<div className="row" style={{ minWidth: "400px", marginTop: "20px" }}>
				<form
					onSubmit={this.props.handleSubmit(this.props.onNext)}
					className="col s12"
				>
					{this.renderFields()}
					<div>
						<button type="submit" className="teal btn-flat right white-text">
							Next
							<i className="material-icons right">done</i>
						</button>
						<Link to="/surveys" className="red btn-flat left white-text">
							Cancel
							<i className="material-icons left">arrow_back</i>
						</Link>
					</div>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	errors.recipients = validateEmails(formValues.recipients || "");

	if (!formValues.title) {
		errors.title = "You must provide a title";
	}

	if (!formValues.subject) {
		errors.subject = "Email must have a subject";
	}
	if (!formValues.body) {
		errors.body = "Body cannot be empty";
	}
	if (!formValues.emails) {
		errors.emails =
			"Emails must be provided in comma separated format. (person@email.com, secondPerson@email.com)!";
	}

	return errors;
};

export default reduxForm({
	validate,
	form: "surveyForm",
	destroyOnUnmount: false,
})(SurveyForm);
