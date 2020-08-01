import { FETCH_SURVEYS } from "../actions/types";

export default (surveys = [], action) => {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return surveys;
	}
};
