import React, { useContext } from "react";

import { CovidContext } from "../../../providers/CovidProvider";

import "./StatList.scss";

import StatItem from "../statItem/StatItem";

const StatList = () => {
	const { statList, prettyPrintStat, changeCaseType, casesType } = useContext(CovidContext);

	return (
		<div className="statList">
			{statList.map((stat, index) => (
				<StatItem
					isRed={stat.isRed}
					active={casesType === stat.casesType}
					onClick={() => changeCaseType(stat.casesType)}
					key={index}
					title={stat.title}
					cases={prettyPrintStat(stat.cases)}
					total={prettyPrintStat(stat.total)}
				/>
			))}
		</div>
	);
};

export default StatList;
