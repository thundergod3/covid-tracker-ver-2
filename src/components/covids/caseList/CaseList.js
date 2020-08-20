import React, { useContext } from "react";

import { CovidContext } from "../../../providers/CovidProvider";

import Table from "@material-ui/core/Table";

import "./CaseList.scss";
import numeral from "numeral";

const CaseList = () => {
	const { caseList } = useContext(CovidContext);

	return (
		<>
			<h1>Live Cases by Country</h1>
			<div className="caseList">
				{caseList.map((eachCase, index) => (
					<tr key={index}>
						<td>{eachCase.country}</td>
						<td>
							<strong>{numeral(eachCase.cases).format("0,0")}</strong>
						</td>
					</tr>
				))}
			</div>
		</>
	);
};

export default CaseList;
