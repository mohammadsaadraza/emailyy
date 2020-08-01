import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "../actions";
import history from "../history";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<Router history={history}>
					<Header />
					<Route path="/" exact component={Landing} />
					<Route path="/surveys" exact component={Dashboard} />
					<Route path="/surveys/new" exact component={SurveyNew} />
				</Router>
			</div>
		);
	}
}

export default connect(null, {
	fetchUser,
})(App);
