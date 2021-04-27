import React, { Component } from "react";

import { CSSTransition } from "react-transition-group";

const animate = (WraperComp) => {
	return class extends Component {
		render() {
			console.log(this.props);
			return (
				<CSSTransition
					in={!!this.props.match}
					timeout={100}
					classNames={{
						enter: "animate__animated",
						enterActive: "animate__slideInRight",
						exit: "animate__animated",
						exitActive: "animate__slideOutLeft",
					}}
					mountOnEnter={true}
					unmountOnExit={true}
				>
					<WraperComp {...this.props}></WraperComp>
				</CSSTransition>
			);
		}
	};
};

export default animate;
