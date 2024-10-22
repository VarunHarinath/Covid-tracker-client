import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapWithUsers from "./components/MapWithUsers";
import Geolocation from "./components/Geolocation";
import CovidScreeningForm from "./components/CovidScreeningForm"; // Import the new component
import React, { useState } from "react";

function App() {
  const [location, setLocation] = useState(null);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow overflow-auto">
          {" "}
          {/* Add overflow-auto for scrolling */}
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center mt-10 p-4">
                  <h1 className="text-2xl font-bold">
                    Welcome to the Covid Tracing App!
                  </h1>
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
              path="/screening"
              element={<CovidScreeningForm />} // New route for the screening form
            />
            <Route
              path="/about"
              element={
                <div className="text-center mt-10 p-4 flex-grow">
                  <h2 className="text-2xl font-bold">About this Application</h2>
                  <p className="mt-4">
                    This application is designed to help trace COVID-19 cases
                    and notify users of potential exposures. It also provides
                    resources for screening and assistance.
                  </p>
                  <p className="mt-2">
                    Our goal is to provide a safe environment and timely
                    information to our users.
                  </p>
                  <p className="mt-2">
                    Please follow health guidelines and stay safe!
                  </p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
