import React from "react";
import { connect } from "react-redux";
import { submitSurvey } from "../../actions";

import formFields from "./formFields";

const SurveyFormReview = ({ onBack, formValues, submitSurvey }) => {
	const renderReviewFields = formFields.map(({ name, label }) => {
		return (
			<div key={name} className="input-field" style={{ margin: "40px 0" }}>
				<label
					className="active"
					style={{ fontSize: "1.2rem", color: "black", fontWeight: "500" }}
				>
					{label}
				</label>
				<input
					type="text"
					value={formValues[name]}
					disabled
					style={{ color: "black", fontWeight: "bold" }}
				/>
			</div>
		);
	});

	return (
		<div className="col s12" style={{ minWidth: "400px", marginTop: "20px" }}>
			<h5>Please confirm your entries</h5>
			{renderReviewFields}
			<div>
				<button
					type="submit"
					className="green btn-flat right white-text"
					onClick={() => submitSurvey(formValues)}
				>
					Submit
					<i className="material-icons right">email</i>
				</button>
				<button
					className="yellow darken-3 btn-flat left white-text"
					onClick={onBack}
				>
					Back
					<i className="material-icons left">arrow_back</i>
				</button>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		formValues: state.form.surveyForm.values,
	};
};
export default connect(mapStateToProps, {
	submitSurvey,
})(SurveyFormReview);
