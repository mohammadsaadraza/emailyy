import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSurveys } from "../../actions";
import ShowPopup from "../ShowPopup";

export class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map((survey) => {
			return (
				<div className="card  hoverable teal darken-1" key={survey._id}>
					<div className="card-content white">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							Sent On: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action" style={{ fontWeight: "bold" }}>
						<a
							className="green-text white btn"
							style={{ marginRight: "10px", borderRadius: "10px" }}
						>
							Yes: {survey.yes}
						</a>
						<a
							className="red-text white btn"
							style={{ marginRight: "10px", borderRadius: "10px" }}
						>
							No: {survey.no}
						</a>
					</div>
				</div>
			);
		});
	}
	render() {
		return (
			<React.Fragment>
				<ShowPopup />
				<div className="row">
					<div className="col s12">{this.renderSurveys()}</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateTopProps = ({ surveys }) => {
	return {
		surveys,
	};
};

export default connect(mapStateTopProps, {
	fetchSurveys,
})(SurveyList);
