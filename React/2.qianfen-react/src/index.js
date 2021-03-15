import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import "./index.css";
// import App from './App';
// import TodoList from "./components/TodoList2/TodoList";
// import TodoList from "./components/TodoList-Redux/TodoList";
import App from "./components/ReactRouter/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import store from "./components/TodoList-Redux/store";

// <Provider store={store}>
// 	<TodoList />
// </Provider>,

ReactDOM.render(
	<BrowserRouter>
		<App></App>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
