import React, { useContext, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import "./ChartCovid.scss";
import { numeral } from "numeral";

import { CovidContext } from "../../../providers/CovidProvider";

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	responsive: true,
	tooltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			labels: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format("+0.0");
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: "time",
				time: {
					format: "MM/DD/YY",
					tooltipFormat: "ll",
				},
				ticks: {
					fontSize: 13,
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					callbacks: function (value, index, values) {
						return numeral(value).format("0.0a");
					},
					fontSize: 13,
					beginAtZero: true,
				},
			},
		],
	},
};

const ChartCovid = () => {
	const [casesHistory, setCasesHistory] = useState([]);
	const { casesType } = useContext(CovidContext);

	const buildChartData = (data, caseType = "cases") => {
		const chartData = [];
		let lastDataPoint;

		for (let date in data.cases) {
			if (lastDataPoint) {
				const newDataPoint = {
					x: date,
					y: data[caseType][date] - lastDataPoint,
				};
				chartData.push(newDataPoint);
			}
			lastDataPoint = data[caseType][date];
		}

		return chartData;
	};

	useEffect(() => {
		const getCasesHistory = async () => {
			await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
				.then((response) => response.json())
				.then((data) => {
					let chartData = buildChartData(data, casesType);
					setCasesHistory(chartData);
					console.log(data);
				});
		};

		getCasesHistory();
	}, [casesType]);

	return (
		<div className="chartCovid">
			<h3>Worldwide new caeses</h3>
			{casesHistory?.length > 0 && (
				<Line
					options={options}
					data={{
						datasets: [
							{
								data: casesHistory,
								backgroundColor: "rgba(204,16,52,0.5)",
								borderColor: "#cc1034",
							},
						],
					}}
				/>
			)}
		</div>
	);
};

export default ChartCovid;
