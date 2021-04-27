import { CHANGESWITCH } from "./acitionTypes";

export const changeSwitch = (checked) => {
	return {
		type: CHANGESWITCH,
		checked,
	};
};
