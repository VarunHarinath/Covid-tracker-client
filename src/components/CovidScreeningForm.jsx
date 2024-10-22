import React, { useState } from "react";
import Geolocation from "./Geolocation"; // Import the Geolocation component

const CovidScreeningForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    file: null,
    cough: "",
    fever: "",
    fatigue: "",
    lossOfTaste: "",
    travelHistory: "",
  });

  const [location, setLocation] = useState({ lat: null, lon: null });

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (loc) => {
    setLocation(loc);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define weights for symptoms
    const symptoms = {
      cough: formData.cough === "yes" ? 1 : 0,
      fever: formData.fever === "yes" ? 2 : 0, // Fever has a higher weight
      fatigue: formData.fatigue === "yes" ? 1 : 0,
      lossOfTaste: formData.lossOfTaste === "yes" ? 3 : 0, // Significant indicator
      travelHistory: formData.travelHistory === "yes" ? 2 : 0, // Travel history is significant
    };

    // Calculate total score
    const totalScore = Object.values(symptoms).reduce(
      (acc, curr) => acc + curr,
      0
    );

    // Set a threshold for COVID status determination
    const covidThreshold = 3; // This can be adjusted based on your criteria

    // Create the final JSON object
    const finalData = {
      lat: location.lat,
      lon: location.lon,
      name: formData.name,
      age: formData.age,
      isCovid: totalScore >= covidThreshold, // Determine COVID status based on score
    };

    // Log the final data to the console
    console.log("Final Data submitted:", finalData);

    // Reset form after submission (optional)
    setFormData({
      name: "",
      age: "",
      file: null,
      cough: "",
      fever: "",
      fatigue: "",
      lossOfTaste: "",
      travelHistory: "",
    });
    setLocation({ lat: null, lon: null });
  };

  return (
    <div className="flex flex-col md:flex-row items-center mt-10 p-4">
      {/* Gradient Box on the Left */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg md:w-1/2 md:mr-4">
        <h2 className="text-2xl font-bold mb-4">COVID-19 Screening</h2>
        <p>
          If you are experiencing symptoms or have been in contact with a
          positive case, please fill out the form below.
        </p>
      </div>

      {/* Geolocation Component */}
      <Geolocation onLocationChange={handleLocationChange} />

      {/* Form on the Right */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg md:w-1/2"
      >
        <h2 className="text-xl font-bold mb-4">
          Take this form if you really suffer from COVID
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 border rounded p-2 w-full"
            required
          />
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-2 border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload your reports:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 border rounded p-2 w-full"
            required
          />
        </div>

        {/* Radio Buttons for Symptoms */}
        {/* Cough */}
        <div className="mb-4">
          <label className="block text-gray-700">Do you have a cough?</label>
          <div className="flex items-center">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="cough"
                value="yes"
                checked={formData.cough === "yes"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.cough === "yes" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="cough"
                value="no"
                checked={formData.cough === "no"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.cough === "no" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              No
            </label>
          </div>
        </div>

        {/* Fever */}
        <div className="mb-4">
          <label className="block text-gray-700">Do you have a fever?</label>
          <div className="flex items-center">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="fever"
                value="yes"
                checked={formData.fever === "yes"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.fever === "yes" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="fever"
                value="no"
                checked={formData.fever === "no"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.fever === "no" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              No
            </label>
          </div>
        </div>

        {/* Fatigue */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Are you experiencing fatigue?
          </label>
          <div className="flex items-center">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="fatigue"
                value="yes"
                checked={formData.fatigue === "yes"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.fatigue === "yes" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="fatigue"
                value="no"
                checked={formData.fatigue === "no"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.fatigue === "no" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              No
            </label>
          </div>
        </div>

        {/* Loss of Taste */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Do you have a loss of taste or smell?
          </label>
          <div className="flex items-center">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="lossOfTaste"
                value="yes"
                checked={formData.lossOfTaste === "yes"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.lossOfTaste === "yes" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="lossOfTaste"
                value="no"
                checked={formData.lossOfTaste === "no"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.lossOfTaste === "no" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              No
            </label>
          </div>
        </div>

        {/* Travel History */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Have you traveled recently?
          </label>
          <div className="flex items-center">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="travelHistory"
                value="yes"
                checked={formData.travelHistory === "yes"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.travelHistory === "yes" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="travelHistory"
                value="no"
                checked={formData.travelHistory === "no"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-blue-500 rounded-full text-blue-500 mr-2 cursor-pointer">
                {formData.travelHistory === "no" && (
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                )}
              </span>
              No
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CovidScreeningForm;
