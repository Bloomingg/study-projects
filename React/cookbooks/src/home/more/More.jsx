import React, { Component } from "react";

import { Switch, Icon, NavBar } from "antd-mobile";
import { connect } from "react-redux";

import { changeSwitch } from "@/home";
const mapStateToProps = (state) => ({
	checked: state.home.checked,
});

const mapDispatchToProps = (dispatch) => ({
	handleChange(checked) {
		dispatch(changeSwitch(checked));
	},
});

class More extends Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => console.log("onLeftClick")}
					rightContent={[
						<Icon key="0" type="search" style={{ marginRight: "16px" }} />,
						<Icon key="1" type="ellipsis" />,
					]}
				>
					NavBar
				</NavBar>
				<Switch
					checked={this.props.checked}
					onChange={this.props.handleChange}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(More);
