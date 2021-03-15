const defaultStates = {
	list: ["task1", "task2"],
};

// eslint-disable-next-line
export default (state = defaultStates, action) => {
	switch (action.type) {
		case "LOAD_DATA":
			return state;
		case "ADD_DATA":
			return {
				...state,
				list: [...state.list, action.task],
			};
		case "REMOVE_DATA":
			const newList = state.list.filter((value, index) => {
				return index !== action.index;
			});
			return {
				...state,
				list: newList,
			};
		default:
			return state;
	}
};
