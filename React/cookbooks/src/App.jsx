import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import Home from "./home/Home";
import List from "./list/List";

export default class App extends Component {
	render() {
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
	}
}

// const App = (props) => {
//   return (
//     <>
//       <Route
//         path="/home"
//         children={(props) => <Home {...props}></Home>}
//       ></Route>
//       <Route
//         path="/list"
//         children={(props) => <List {...props}></List>}
//       ></Route>
//       <Redirect from="/" to="home"></Redirect>
//     </>
//   );
// }

// export default App
