import React, { useCallback, useState } from "react";

import { SearchBar } from "antd-mobile";
import Menu from "./Menu";

import { CategoryWrap } from "./StyledCategory";

const Categoory = () => {
	let [searchValue, setSearchValue] = useState("");
	let [tabIndex, settabIndex] = useState(0);
	let [type, settype] = useState("category");

	const onChange = useCallback((val) => setSearchValue(val), []);
	const handleClick = useCallback((index) => {
		return () => {
			settabIndex(index);
			settype(index === 1 ? "material" : "category");
		};
	}, []);

	return (
		<CategoryWrap>
			<nav>
				<ul>
					<li
						className={tabIndex === 0 ? "active" : ""}
						onClick={handleClick(0)}
					>
						分类
					</li>
					<li
						className={tabIndex === 1 ? "active" : ""}
						onClick={handleClick(1)}
					>
						食材
					</li>
					<li className={tabIndex === 0 ? "slide" : "slide right"}></li>
				</ul>
			</nav>
			<SearchBar value={searchValue} placeholder="Search" onChange={onChange} />
			<Menu type={type}></Menu>
		</CategoryWrap>
	);
};

export default Categoory;
