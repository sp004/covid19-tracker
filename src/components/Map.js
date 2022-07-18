import React from "react";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { colorOnMap } from "../util";

const Map = (props) => {
  console.log("in map.js",props.center, props.zoom)
  return (
    <div className="map">
      <MapContainer center={props.center} zoom={props.zoom}>
        {console.log("😊",props.center)}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {colorOnMap(props.countryColor)}
      </MapContainer>
    </div>
  );
};

export default Map;

// India - 43165738 - 02.06.22