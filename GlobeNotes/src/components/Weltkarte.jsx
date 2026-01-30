import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Marker Icon fixen
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Weltkarte-Komponente zeigt eine interaktive Karte mit  an.
export default function Weltkarte({ reiseziel }) {
    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '600px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {reiseziel.map((ziel, index) => (
                <Marker key={index} position={[ziel.latitude, ziel.longitude]}>
                    <Popup>
                        {ziel.ort} <br />
                        Jahr: {ziel.jahr}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
