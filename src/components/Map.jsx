import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom icon for user's location
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3006/3006884.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const Map = ({ users, userLocation }) => {
  const position = [17.385044, 78.486671]; // Default position (Central Hyderabad)

  const testUsers = [
    { lat: 17.385044, lon: 78.486671, name: "John Doe", hasCovid: true },
    { lat: 17.425, lon: 78.451, name: "Jane Smith", hasCovid: false },
    { lat: 17.452, lon: 78.457, name: "Alice Johnson", hasCovid: true },
    { lat: 17.423, lon: 78.493, name: "Bob Brown", hasCovid: false },
    { lat: 17.388, lon: 78.481, name: "Charlie Black", hasCovid: true },
  ];

  return (
    <MapContainer
      center={userLocation ? [userLocation.lat, userLocation.lon] : position}
      zoom={13}
      style={{ height: "100%", width: "100%" }} // Full height and width
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
          <Popup>
            <div>
              <strong>Your Location</strong>
            </div>
          </Popup>
        </Marker>
      )}
      {testUsers.map((user, index) => (
        <Marker key={index} position={[user.lat, user.lon]}>
          <Popup>
            <div>
              <strong>Name:</strong> {user.name} <br />
              <strong>Status:</strong>{" "}
              {user.hasCovid ? "COVID Positive" : "Safe"}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
