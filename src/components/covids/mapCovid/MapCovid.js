import React, { useContext } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import "./MapCovid.scss";
import "leaflet/dist/leaflet.css";

import { CovidContext } from "../../../providers/CovidProvider";

const MapCovid = () => {
	const { mapCenter, mapZoom, mapCountries, showDataOnMap, casesType } = useContext(CovidContext);

	return (
		<div className="mapCovid">
			<LeafletMap center={mapCenter} zoom={mapZoom}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href='http://osm.org/copyright'>OpenStreet</a> contributors"
				/>
				{showDataOnMap(mapCountries, casesType)}
			</LeafletMap>
		</div>
	);
};

export default MapCovid;
