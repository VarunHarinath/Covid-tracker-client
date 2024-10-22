// src/components/Map.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  const position = [20.5937, 78.9629]; // Default position (India)

  // Test users data
  const users = [
    { lat: 17.385044, lon: 78.486671, name: "John Doe", hasCovid: true }, // Location: Central Hyderabad
    { lat: 17.425, lon: 78.451, name: "Jane Smith", hasCovid: false }, // Location: Banjara Hills
    { lat: 17.452, lon: 78.457, name: "Alice Johnson", hasCovid: true }, // Location: Gachibowli
    { lat: 17.423, lon: 78.493, name: "Bob Brown", hasCovid: false }, // Location: Hitech City
    { lat: 17.385044, lon: 78.486671, name: "Charlie Black", hasCovid: true }, // Location: Central Hyderabad
  ];

  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {users.map((user, index) => (
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
