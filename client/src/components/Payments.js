import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";

import { handleToken } from "../actions";

class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500}
				token={(token) => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button
					className="btn white"
					style={{ color: "black", fontWeight: 700, margin: "0 0.5rem" }}
				>
					Add Credits
				</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, {
	handleToken,
})(Payments);
