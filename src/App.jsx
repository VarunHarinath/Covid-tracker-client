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
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center mt-10 p-4">
                  <h1 className="text-3xl font-bold text-center mb-6">
                    Welcome to the COVID Tracing App!
                  </h1>
                  <Geolocation onLocationChange={setLocation} />
                  {location && (
                    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                      <h2 className="text-xl font-semibold">Your Location:</h2>
                      <p>
                        Latitude:{" "}
                        <span className="font-medium">{location.lat}</span>
                      </p>
                      <p>
                        Longitude:{" "}
                        <span className="font-medium">{location.lon}</span>
                      </p>
                    </div>
                  )}
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={() => (window.location.href = "/screening")}
                      className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition"
                    >
                      Start Screening
                    </button>
                    <button
                      onClick={() => (window.location.href = "/map")}
                      className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 transition"
                    >
                      View Map
                    </button>
                  </div>

                  {/* COVID-19 Information Section */}
                  <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-10 max-w-lg">
                    <h2 className="text-2xl font-bold mb-4">
                      What You Need to Know About COVID-19
                    </h2>
                    <p className="mb-2">
                      COVID-19 is a respiratory illness caused by the
                      coronavirus SARS-CoV-2. It spreads primarily through
                      respiratory droplets when an infected person coughs,
                      sneezes, or talks.
                    </p>
                    <p className="mb-2">
                      Symptoms can range from mild to severe, including fever,
                      cough, and difficulty breathing. It is crucial to follow
                      public health guidelines to protect yourself and others.
                    </p>
                    <p>
                      Stay informed, maintain social distancing, wear masks in
                      crowded places, and practice good hand hygiene.
                    </p>
                  </div>
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
