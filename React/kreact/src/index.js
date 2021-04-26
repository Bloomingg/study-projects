// import React from 'react';
// import ReactDOM from 'react-dom';
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import { render } from "./kreact/react-dom";
import { Component } from "./kreact/react";

const MyFunc = (props) => (
	<div className="border">
		<h1>My Function</h1>
		<a href="lovexuan.link">{props.name}</a>
	</div>
);

class MyClass extends Component {
	render() {
		return (
			<div className="border">
				<h1>My Class</h1>
				<a href="lovexuan.link">{this.props.name}</a>
			</div>
		);
	}
}

const jsx = (
	<div className="border">
		<h1>My React</h1>
		<a href="lovexuan.link">blooming</a>
		<MyFunc name="blooming" />
		<MyClass name="blooming" />
	</div>
);

render(jsx, document.getElementById("root"));
