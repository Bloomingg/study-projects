export default ({ dispatch, getState }) => (next) => (action) => {
	console.log(getState());
	next(action);
};
