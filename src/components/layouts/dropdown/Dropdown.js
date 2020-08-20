import React, { useContext } from "react";

import FromControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { CovidContext } from "../../../providers/CovidProvider";

import "./Dropdown.scss";

const Dropdown = () => {
	const { countryList, country, onCountryChange } = useContext(CovidContext);

	return (
		<FromControl className="dropdown">
			<Select variant="outlined" value={country} onChange={onCountryChange}>
				<MenuItem value="worldwide">Worldwide</MenuItem>
				{countryList.map((country, index) => (
					<MenuItem key={index} value={country.value}>
						{country.name}
					</MenuItem>
				))}
			</Select>
		</FromControl>
	);
};

export default Dropdown;
