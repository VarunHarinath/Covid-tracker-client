// src/components/Map.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Create a custom icon for the user's location
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3006/3006884.png", // Replace with your icon URL
  iconSize: [30, 30], // Size of the icon
  iconAnchor: [15, 30], // Point of the icon which will correspond to marker's location
});

const Map = ({ users, userLocation }) => {
  const position = [17.385044, 78.486671]; // Default position (Central Hyderabad)

  // Test users data
  const testUsers = [
    { lat: 17.385044, lon: 78.486671, name: "John Doe", hasCovid: true }, // Location: Central Hyderabad
    { lat: 17.425, lon: 78.451, name: "Jane Smith", hasCovid: false }, // Location: Banjara Hills
    { lat: 17.452, lon: 78.457, name: "Alice Johnson", hasCovid: true }, // Location: Gachibowli
    { lat: 17.423, lon: 78.493, name: "Bob Brown", hasCovid: false }, // Location: Hitech City
    { lat: 17.385044, lon: 78.486671, name: "Charlie Black", hasCovid: true }, // Location: Central Hyderabad
  ];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Render user's current location marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
          <Popup>
            <div>
              <strong>Your Location</strong>
            </div>
          </Popup>
        </Marker>
      )}
      {/* Render other users' markers */}
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
