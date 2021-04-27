import { CHANGESWITCH } from "./acitionTypes";

const initialState = {
	checked: true,
};
// eslint-disable-next-line
export default (state = initialState, { type, checked }) => {
	switch (type) {
		case CHANGESWITCH:
			return {
				checked,
			};
		default:
			return state;
	}
};
