import React from "react";

import "./App.scss";
import { CovidProvider } from "./providers/CovidProvider";

import Header from "./components/layouts/header/Header";
import StatList from "./components/covids/statList/StatList";
import MapCovid from "./components/covids/mapCovid/MapCovid";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ChartCovid from "./components/covids/chartCovid/ChartCovid";
import CaseList from "./components/covids/caseList/CaseList";

const App = () => {
	return (
		<CovidProvider>
			<div className="app">
				<div className="app__left">
					<Header />
					<StatList />
					<MapCovid />
				</div>
				<Card className="app__right">
					<CardContent>
						<CaseList />
						<ChartCovid />
					</CardContent>
				</Card>
			</div>
		</CovidProvider>
	);
};

export default App;
