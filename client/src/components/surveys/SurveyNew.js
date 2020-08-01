import React, { Component } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
	state = {
		showReview: false,
	};

	onS;

	render() {
		return (
			<div>
				{!this.state.showReview ? (
					<SurveyForm
						onNext={() => {
							this.setState({
								showReview: true,
							});
						}}
					/>
				) : (
					<SurveyFormReview
						onBack={() => {
							this.setState({
								showReview: false,
							});
						}}
					/>
				)}
			</div>
		);
	}
}

export default reduxForm({
	form: "surveyForm",
})(SurveyNew);
