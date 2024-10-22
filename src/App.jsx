import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import MapWithUsers from "./components/MapWithUsers";
import Geolocation from "./components/Geolocation";

function App() {
  const [location, setLocation] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center mt-10">
                <h1>Welcome to the Contact Tracing App!</h1>
                <Geolocation onLocationChange={setLocation} />{" "}
                {/* Use Geolocation */}
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
              <div className="text-center mt-10">About this application...</div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
