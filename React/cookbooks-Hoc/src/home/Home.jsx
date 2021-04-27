import React, { useState } from "react";
import { useStore } from "react-redux";
import animateHoc from "@u/animateHoc";

import { TabBar } from "antd-mobile";
import CookBook from "./cookbook/CookBook";
import Categoory from "./category/Categoory";
import More from "./more/More";

import cookbook from "@i/cookbook.png";
import cookbook_active from "@i/cookbook-active.png";
import location from "@i/location.png";
import location_active from "@i/location-active.png";
import menu from "@i/menu.png";
import menu_active from "@i/menu-active.png";
import more from "@i/more.png";
import more_active from "@i/more-active.png";

const Home = (props) => {
	const { home } = useStore().getState();

	let [tabs, setTabs] = useState({
		selectedTab: "blueTab",
		hidden: false,
		fullScreen: true,
	});
	console.log(tabs);

	// const dispatch = useDispatch()

	const tabItems = [
		<TabBar.Item
			title="CookBook"
			key="CookBook"
			icon={
				<div
					style={{
						width: "22px",
						height: "22px",
						background:
							"url(" + cookbook + ") center center /  21px 21px no-repeat",
					}}
				/>
			}
			selectedIcon={
				<div
					style={{
						width: "22px",
						height: "22px",
						background:
							"url(" +
							cookbook_active +
							") center center /  21px 21px no-repeat",
					}}
				/>
			}
			selected={tabs.selectedTab === "blueTab"}
			onPress={() => {
				setTabs({
					selectedTab: "blueTab",
				});
			}}
			data-seed="logId"
		>
			<CookBook></CookBook>
		</TabBar.Item>,
		<TabBar.Item
			icon={
				<div
					style={{
						width: "22px",
						height: "22px",
						background:
							"url(" + menu + ") center center /  21px 21px no-repeat",
					}}
				/>
			}
			selectedIcon={
				<div
					style={{
						width: "22px",
						height: "22px",
						background:
							"url(" + menu_active + ") center center /  21px 21px no-repeat",
					}}
				/>
			}
			title="Menu"
			key="Menu"
			selected={tabs.selectedTab === "redTab"}
			onPress={() => {
				setTabs({
					selectedTab: "redTab",
				});
			}}
			data-seed="logId1"
		>
			<Categoory></Categoory>
		</TabBar.Item>,
		<TabBar.Item
			icon={
				<div
					style={{
						width: "22px",
						height: "22px",
						background:
							"url(" + location + ") center center /  21px 21px no-repeat",
					}}
				/>
			}
			selectedIcon={
				<div
					style={{
						width: "22px",
						height: "22px",
						background:
							"url(" +
							location_active +
							") center center /  21px 21px no-repeat",
					}}
				/>
			}
			title="Location"
			key="Location"
			selected={tabs.selectedTab === "greenTab"}
			onPress={() => {
				setTabs({
					selectedTab: "greenTab",
				});
			}}
		>
			<div>Location</div>
		</TabBar.Item>,
		<TabBar.Item
			icon={{ uri: more }}
			selectedIcon={{ uri: more_active }}
			title="More"
			key="More"
			selected={tabs.selectedTab === "yellowTab"}
			onPress={() => {
				setTabs({
					selectedTab: "yellowTab",
				});
			}}
		>
			<More></More>
		</TabBar.Item>,
	];

	return (
		<div style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}>
			<TabBar
				unselectedTintColor="#949494"
				tintColor="#000000"
				barTintColor="white"
				hidden={tabs.hidden}
			>
				{home.checked
					? tabItems.map((t) => t)
					: tabItems.filter((t, i) => i !== 2)}
			</TabBar>
		</div>
	);
};

export default animateHoc(Home);
