import React, { Component } from "react";
import animateHoc from "@u/animateHoc";
// import { withRouter } from "react-router-dom";

import { Icon, NavBar } from "antd-mobile";

class List extends Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={[<Icon key="1" type="ellipsis" />]}
				>
					{this.props.location.state && this.props.location.state.title}
				</NavBar>
			</div>
		);
	}
}

export default animateHoc(List);
