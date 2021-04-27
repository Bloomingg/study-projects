import React, { useContext } from "react";

import { Color, ColorContext, UPDATE_COLOR } from "./colorContext";

const ShowArea = () => {
	const { color } = useContext(ColorContext);
	return <div style={{ color: color }}>当前字体颜色为{color}</div>;
};

const ChangeButon = () => {
	// const context = useContext(ColorContext);
	// console.log(context);
	const { dispatch } = useContext(ColorContext);
	return (
		<div>
			<button onClick={() => dispatch({ type: UPDATE_COLOR, color: "yellow" })}>
				黄色
			</button>
			<button onClick={() => dispatch({ type: UPDATE_COLOR, color: "green" })}>
				绿色
			</button>
		</div>
	);
};

const toUseReducer = () => {
	return (
		<Color>
			<ShowArea></ShowArea>
			<ChangeButon></ChangeButon>
		</Color>
	);
};
export default toUseReducer;
