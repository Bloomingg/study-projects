import React from "react";
import { Route, Redirect } from "react-router-dom";

import Home from "./home/Home";
import List from "./list/List";

const App = (props) => {
	return (
		<>
			<Route
				path="/home"
				children={(props) => <Home {...props}></Home>}
			></Route>
			<Route
				path="/list"
				children={(props) => <List {...props}></List>}
			></Route>
			<Redirect from="/" to="home"></Redirect>
		</>
	);
};

export default App;
