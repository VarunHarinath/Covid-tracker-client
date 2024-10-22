// src/components/MapWithUsers.js
import React, { useState } from "react";
import Geolocation from "./Geolocation";
import Map from "./Map";

const MapWithUsers = () => {
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
  const [dangerStatus, setDangerStatus] = useState(false); // State to track danger status

  const handleLocationChange = (location) => {
    setUserLocation(location); // Update user location state
  };

  // Sample users data
  const testUsers = [
    { lat: 17.385044, lon: 78.486671, name: "John Doe", hasCovid: true }, // Location: Central Hyderabad
    { lat: 17.425, lon: 78.451, name: "Jane Smith", hasCovid: false }, // Location: Banjara Hills
    { lat: 17.452, lon: 78.457, name: "Alice Johnson", hasCovid: true }, // Location: Gachibowli
    { lat: 17.423, lon: 78.493, name: "Bob Brown", hasCovid: false }, // Location: Hitech City
    { lat: 17.388, lon: 78.481, name: "Charlie Black", hasCovid: true }, // Another user close to Central Hyderabad
  ];

  // Function to calculate distance between two lat/lon points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Check for nearby COVID-positive users
  const checkDangerStatus = () => {
    if (!userLocation) return false;

    const dangerThreshold = 1; // 1 km
    let nearbyCovidUsersCount = 0;

    testUsers.forEach((user) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lon,
        user.lat,
        user.lon
      );
      if (user.hasCovid && distance <= dangerThreshold) {
        nearbyCovidUsersCount++;
      }
    });

    return nearbyCovidUsersCount > 3; // In danger if more than 3 nearby positive users
  };

  // Update danger status based on user's location
  React.useEffect(() => {
    if (userLocation) {
      const danger = checkDangerStatus();
      setDangerStatus(danger); // Update danger status
    }
  }, [userLocation]);

  return (
    <>
      <Geolocation onLocationChange={handleLocationChange} />
      <Map
        users={testUsers}
        userLocation={userLocation}
        isUserInDanger={dangerStatus} // Pass danger status to the Map component
      />
    </>
  );
};

export default MapWithUsers;
