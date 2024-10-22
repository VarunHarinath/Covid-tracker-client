// src/components/MapWithUsers.js
import React, { useState } from "react";
import Geolocation from "./Geolocation";
import Map from "./Map";

const MapWithUsers = () => {
  const [userLocation, setUserLocation] = useState(null); // State to store user's location

  const handleLocationChange = (location) => {
    setUserLocation(location); // Update user location state
  };

  return (
    <>
      <Geolocation onLocationChange={handleLocationChange} />
      {userLocation && <Map users={[userLocation]} />}{" "}
      {/* Pass user location to the Map component */}
    </>
  );
};

export default MapWithUsers;
