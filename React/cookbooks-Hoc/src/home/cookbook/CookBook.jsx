import React, { useState } from "react";

import { Wraper } from "./style";

import Swiper from "./Swiper";
import HotCate from "./HotCate";

import { SearchBar } from "antd-mobile";

const CookBook = (props) => {
	const [value, setValue] = useState("");

	return (
		<Wraper>
			<header>美食大全</header>
			<Swiper></Swiper>
			<SearchBar
				value={value}
				placeholder="Search"
				onSubmit={(value) => console.log(value, "onSubmit")}
				onClear={(value) => console.log(value, "onClear")}
				onFocus={() => console.log("onFocus")}
				onBlur={() => console.log("onBlur")}
				onCancel={() => console.log("onCancel")}
				onChange={(value) => setValue(value)}
			/>
			<HotCate></HotCate>
		</Wraper>
	);
};

export default CookBook;
