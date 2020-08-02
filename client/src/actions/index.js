import axios from "axios";
import {
	FETCH_USER,
	FETCH_SURVEYS,
	SHOW_CREDITS_POPUP,
	SHOW_LOGIN_POPUP,
	CLOSE_LOGIN_POPUP,
	CLOSE_CREDITS_POPUP,
} from "./types";
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

export const closeLogin = () => {
	history.push("/");
	return {
		type: CLOSE_LOGIN_POPUP,
	};
};

export const closeCrdits = () => {
	return {
		type: CLOSE_CREDITS_POPUP,
	};
};

export const submitSurvey = (formValues) => {
	return async (dispatch, getState) => {
		const auth = getState().auth;

		if (!auth) {
			dispatch({
				type: SHOW_LOGIN_POPUP,
			});
		} else if (auth.credits === 0) {
			dispatch({
				type: SHOW_CREDITS_POPUP,
			});
		} else {
			const res = await axios.post("/api/surveys", formValues);

			dispatch({
				type: FETCH_USER,
				payload: res.data,
			});
			history.push("/surveys");
		}
	};
};

export const fetchSurveys = () => {
	return async (dispatch, getState) => {
		await dispatch(fetchUser());

		const auth = getState().auth;

		if (!auth) {
			dispatch({
				type: SHOW_LOGIN_POPUP,
			});
		} else {
			const res = await axios.get("/api/surveys");

			dispatch({
				type: FETCH_SURVEYS,
				payload: res.data,
			});
		}
	};
};
