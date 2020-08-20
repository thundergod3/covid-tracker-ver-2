import React from "react";

import Dropdown from "../dropdown/Dropdown";

import "./Header.scss";

const Header = () => {
	return (
		<div className="header">
			<h1 className="header__title">covid-19 tracker</h1>
			<Dropdown />
		</div>
	);
};

export default Header;
