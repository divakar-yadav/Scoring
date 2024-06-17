import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './SmallMap.css'; // Import the CSS file

// Fix for default marker icon issue in Leaflet
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const SmallMap = ({ lat, lng }) => {
    const position = [lat, lng];

    return (
        <MapContainer center={position} zoom={15} style={{ height: '200px', width: '200px', minWidth: '200px', maxWidth: '200px'}}  zoomControl={false}             attributionControl={false} // Disable attribution control
        // Disable zoom control
>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    Latitude: {lat}, Longitude: {lng}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default SmallMap;
