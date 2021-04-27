import { combineReducers } from "redux";

import { reducer as home } from "../home/";

const reducer = combineReducers({
	home,
});

export default reducer;
