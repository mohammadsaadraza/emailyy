import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";

import Payments from "./Payments";

class Header extends Component {
	componentDidMount() {
		document.addEventListener("DOMContentLoaded", () => {
			var elems = document.querySelectorAll(".sidenav");
			M.Sidenav.init(elems);
		});
	}
	renderContent() {
		switch (this.props.auth) {
			case null:
				return null;
			case false:
				return (
					<li>
						<a href="/auth/google" className="btn blue">
							<i className="material-icons left" style={{ margin: "0 10px" }}>
								portrait
							</i>
							LOG IN WITH GOOGLE
						</a>
					</li>
				);
			default:
				return [
					<li key="1">
						<Payments />
					</li>,
					<li key="2">
						<a href="#" className="btn">
							Credits: {this.props.auth.credits}
						</a>
					</li>,
					<li key="3">
						<a href="/auth/logout" className="red btn">
							<i className="material-icons left" style={{ margin: "0 10px" }}>
								portrait
							</i>
							LOG OUT
						</a>
					</li>,
				];
		}
	}

	render() {
		return (
			<React.Fragment>
				<nav>
					<div className="nav-wrapper" style={{ padding: "0 2rem" }}>
						<Link
							to={this.props.auth ? "/surveys" : "/"}
							className="brand-logo"
						>
							Emaily
						</Link>
						<a href="#" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						<ul className="right hide-on-med-and-down">
							{this.renderContent()}
						</ul>
					</div>
				</nav>

				<ul className="sidenav" id="mobile-demo">
					{this.renderContent()}
				</ul>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(Header);
