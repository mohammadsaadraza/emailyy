import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return null;
			case false:
				return (
					<li>
						<a
							href="/auth/google"
							className="waves-effect waves-light blue btn"
						>
							<i className="material-icons left">portrait</i>LOG IN WITH GOOGLE
						</a>
					</li>
				);
			default:
				return [
					<li key="1">
						<Payments />
					</li>,
					<li key="2">
						<button className="btn">Credits: {this.props.auth.credits}</button>
					</li>,
					<li key="3">
						<a href="/auth/logout" className="red btn">
							<i className="material-icons left">portrait</i>LOG OUT
						</a>
					</li>,
				];
		}
	}

	render() {
		return (
			<nav>
				<div
					className="nav-wrapper grey darken-4"
					style={{ padding: "0 2rem" }}
				>
					<Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">
						Emaily
					</Link>
					<ul className="right hide-on-med-and-down">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(Header);
