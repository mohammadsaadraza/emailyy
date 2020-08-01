import React from "react";
import { Link } from "react-router-dom";

import SurveyList from "./surveys/SurveyList";

const Dashboard = () => {
	return (
		<div>
			<SurveyList />
			{renderAddBtn()}
		</div>
	);
};

const renderAddBtn = () => {
	return (
		<Link to="/surveys/new">
			<div className="fixed-action-btn">
				<div className="btn-floating btn-large pulse red">
					<i className="material-icons">add</i>
				</div>
			</div>
		</Link>
	);
};

export default Dashboard;
