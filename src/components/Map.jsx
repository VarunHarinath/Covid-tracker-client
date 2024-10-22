import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom icon for user's location
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3006/3006884.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Function to calculate distance between two coordinates in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const Map = ({ users, userLocation }) => {
  const position = [17.385044, 78.486671]; // Default position (Central Hyderabad)

  const testUsers = [
    { lat: 17.5535145, lon: 78.4446315, name: "John Doe", hasCovid: true }, // Current user
    { lat: 17.551, lon: 78.446, name: "Jane Smith", hasCovid: false }, // Nearby user 1
    { lat: 17.554, lon: 78.442, name: "Alice Johnson", hasCovid: true }, // Nearby user 2
    { lat: 17.425, lon: 78.451, name: "Bob Brown", hasCovid: false }, // Further user
    { lat: 17.388, lon: 78.481, name: "Charlie Black", hasCovid: true }, // Another user
  ];

  // Calculate danger status based on nearby COVID positive users
  const dangerThreshold = 1; // 1 km
  let positiveNearbyCount = 0;

  // Check if the user location is available
  if (userLocation) {
    testUsers.forEach((user) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lon,
        user.lat,
        user.lon
      );
      if (user.hasCovid && distance <= dangerThreshold) {
        positiveNearbyCount++;
      }
    });
  }

  const userStatus = positiveNearbyCount >= 2 ? "In Danger" : "Safe";

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
              <strong>Your Location</strong> <br />
              <strong>Status:</strong> {userStatus}
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
