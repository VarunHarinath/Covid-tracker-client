import React, { useState } from "react";
import Geolocation from "./Geolocation";
import Map from "./Map";

const MapWithUsers = () => {
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  return (
    <>
      <Geolocation onLocationChange={handleLocationChange} />
      <div className="flex-grow h-full">
        {" "}
        {/* Ensure full height and grow */}
        <Map users={[userLocation]} userLocation={userLocation} />
      </div>
    </>
  );
};

export default MapWithUsers;
