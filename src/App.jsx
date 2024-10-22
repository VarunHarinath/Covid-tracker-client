import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapWithUsers from "./components/MapWithUsers";
import Geolocation from "./components/Geolocation";
import React, { useState } from "react";

function App() {
  const [location, setLocation] = useState(null);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {" "}
        {/* Main container with Flexbox */}
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center mt-10 flex-grow">
                <h1>Welcome to the Covid Tracing App!</h1>
                <Geolocation onLocationChange={setLocation} />
                {location && (
                  <div>
                    <p>Your Location:</p>
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.lon}</p>
                  </div>
                )}
              </div>
            }
          />
          <Route
            path="/map"
            element={<MapWithUsers userLocation={location} />}
          />
          <Route
            path="/about"
            element={
              <div className="text-center mt-10 flex-grow">
                About this application...
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
