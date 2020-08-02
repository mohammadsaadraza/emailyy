import React, { Component } from "react";
import { connect } from "react-redux";

import { closeCrdits, closeLogin } from "../actions";
import Modal from "../utils/Modal";

class ShowPopup extends Component {
	renderLoginActions = () => {
		return (
			<button
				onClick={() => this.props.closeLogin()}
				className="white-text red btn"
			>
				Go Back
			</button>
		);
	};

	renderCreditsActions = () => {
		return (
			<button
				onClick={() => this.props.closeCrdits()}
				className="white-text red btn"
			>
				Go Back
			</button>
		);
	};

	render() {
		if (this.props.showLogin) {
			console.log(this.props);
			return (
				<Modal
					title={"LOGIN REQUIRED"}
					content="You must be logged in to access this feature!"
					actions={this.renderLoginActions()}
				/>
			);
		} else if (this.props.showCredits) {
			return (
				<Modal
					title={"NO CREDITS AVAILABLE"}
					content="You must add credits to your account to access this feature!"
					actions={this.renderCreditsActions()}
				/>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		showLogin: state.popup.showLogin,
		showCredits: state.popup.showCredits,
	};
};

export default connect(mapStateToProps, {
	closeCrdits,
	closeLogin,
})(ShowPopup);
