import {
	SHOW_CREDITS_POPUP,
	SHOW_LOGIN_POPUP,
	CLOSE_LOGIN_POPUP,
	CLOSE_CREDITS_POPUP,
} from "../actions/types";

export default (popup = { showLogin: false, showCredits: false }, action) => {
	switch (action.type) {
		case SHOW_LOGIN_POPUP:
			return {
				...popup,
				showLogin: true,
			};
		case SHOW_CREDITS_POPUP:
			return {
				...popup,
				showCredits: true,
			};
		case CLOSE_LOGIN_POPUP:
			return {
				...popup,
				showLogin: false,
			};
		case CLOSE_CREDITS_POPUP:
			return {
				...popup,
				showCredits: false,
			};
		default:
			return popup;
	}
};
