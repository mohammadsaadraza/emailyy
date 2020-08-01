import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";
import history from "../history";

export const fetchUser = () => {
	return async (dispatch) => {
		const user = await axios.get("/api/current_user");

		dispatch({
			type: FETCH_USER,
			payload: user.data,
		});
	};
};

export const handleToken = (token) => {
	return async (dispatch) => {
		const res = await axios.post("/api/stripe", token);

		dispatch({
			type: FETCH_USER,
			payload: res.data,
		});
	};
};

export const submitSurvey = (formValues) => {
	return async (dispatch) => {
		const res = await axios.post("/api/surveys", formValues);

		dispatch({
			type: FETCH_USER,
			payload: res.data,
		});
		history.push("/surveys");
	};
};

export const fetchSurveys = () => {
	return async (dispatch) => {
		const res = await axios.get("/api/surveys");

		dispatch({
			type: FETCH_SURVEYS,
			payload: res.data,
		});
	};
};
