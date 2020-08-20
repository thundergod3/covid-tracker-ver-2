import React, { useState, useEffect, createContext } from "react";
import { Circle, Popup } from "react-leaflet";

import numeral from "numeral";

const casesTypeColors = {
	cases: {
		hex: "#CC1034",
		multiplier: 800,
	},
	recovered: {
		hex: "#7dd71d",
		multiplier: 1200,
	},
	deaths: {
		hex: "#fb4443",
		multiplier: 2000,
	},
};

const CovidContext = createContext();

const CovidProvider = ({ children }) => {
	const [state, setState] = useState({
		countryList: [],
		country: "worldwide",
		statList: [],
		countryDetail: {},
		caseList: [],
		mapCenter: { lat: 34.80746, lng: -40.4796 },
		mapZoom: 3,
		mapCountries: [],
		casesType: "cases",
	});

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;

		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const statList = [
					{
						title: "Coronavirus Cases",
						cases: data.todayCases,
						total: data.cases,
						isRed: true,
					},
					{
						title: "Recovered",
						cases: data.todayRecovered,
						total: data.recovered,
						isRed: false,
					},
					{
						title: "Death",
						cases: data.todayDeaths,
						total: data.deaths,
						isRed: true,
					},
				];

				setState((prevState) => {
					return {
						...prevState,
						countryDetail: data,
						country: countryCode,
						statList,
						mapCenter: {
							lat: data.countryInfo ? data.countryInfo.lat : state.mapCenter.lat,
							lng: data.countryInfo ? data.countryInfo.long : state.mapCenter.lng,
							mapZoom: data.countryInfo ? 4 : state.mapZoom,
						},
					};
				});
			});
	};

	const sortData = (data) => {
		const sortedData = [...data];

		return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
	};

	const prettyPrintStat = (stat) => (stat ? `+${numeral(stat).format("0.0a")}` : "+0");

	const showDataOnMap = (data, casesType = "cases") => {
		return data.map((country, index) => (
			<Circle
				key={index}
				center={[country.countryInfo.lat, country.countryInfo.long]}
				fillOpacity={0.4}
				fillColor={casesTypeColors[casesType].hex}
				color={casesTypeColors[casesType].hex}
				radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}>
				<Popup>
					<div className="info-container">
						<div className="info-flag" style={{ background: `url(${country.countryInfo.flag})` }}></div>
						<div className="info-name">{country.country}</div>
						<div className="info-confirmed">Cases: {numeral(country.cases).format("0.0")}</div>
						<div className="info-recovered">Recovered: {numeral(country.recovered).format("0.0")}</div>
						<div className="info-deaths">Deaths: {numeral(country.deaths).format("0.0")}</div>
					</div>
				</Popup>
			</Circle>
		));
	};

	const changeCaseType = (casesType) =>
		setState((prevState) => {
			return {
				...prevState,
				casesType,
			};
		});

	useEffect(() => {
		const getStatData = async () => {
			await fetch("https://disease.sh/v3/covid-19/all")
				.then((response) => response.json())
				.then((data) => {
					const statList = [
						{
							title: "Coronavirus Cases",
							cases: data.todayCases,
							total: data.cases,
							casesType: "cases",
							isRed: true,
						},
						{
							title: "Recovered",
							cases: data.todayRecovered,
							total: data.recovered,
							casesType: "recovered",
							isRed: false,
						},
						{
							title: "Deaths",
							cases: data.todayDeaths,
							total: data.deaths,
							casesType: "deaths",
							isRed: true,
						},
					];

					setState((preState) => {
						return {
							...preState,
							statList,
						};
					});
				});
		};

		getStatData();
	}, []);

	useEffect(() => {
		const getcountryData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countryList = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					setState((preState) => {
						return {
							...preState,
							countryList,
							caseList: sortData(data),
							mapCountries: data,
						};
					});
				});
		};

		getcountryData();
	}, []);

	return (
		<CovidContext.Provider value={{ ...state, onCountryChange, showDataOnMap, prettyPrintStat, changeCaseType }}>
			{children}
		</CovidContext.Provider>
	);
};

export { CovidProvider, CovidContext };
