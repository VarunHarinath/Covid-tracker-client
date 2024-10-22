// src/Geolocation.js
import React, { useState, useEffect } from "react";

const Geolocation = ({ onLocationChange }) => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          onLocationChange({ lat, lon }); // Pass the location back to the parent component
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {location.lat && location.lon ? <p></p> : <p>Fetching location...</p>}
    </div>
  );
};

export default Geolocation;
