import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./StatItem.scss";

const StatItem = ({ title, cases, total, active, isRed, ...props }) => {
	return (
		<Card
			className={`statItem ${active && "statItem--active"} ${active && isRed && "statItem---red"}`}
			onClick={props.onClick}>
			<CardContent className="statItem__title" color="textSecondary">
				{title}
				<h2 className={`statItem__cases ${!isRed && "statItem__cases--green"}`}>{cases}</h2>
				<Typography className="statItem__total" color="textSecondary">
					{total}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default StatItem;
