// src/components/CovidScreeningForm.js
import React, { useState } from "react";

const CovidScreeningForm = () => {
  const [formData, setFormData] = useState({
    file: null,
    cough: "",
    fever: "",
    fatigue: "",
    lossOfTaste: "",
    travelHistory: "",
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the data to the console (or send it to a server)
    console.log("Form Data submitted:", formData);

    // Reset form after submission (optional)
    setFormData({
      file: null,
      cough: "",
      fever: "",
      fatigue: "",
      lossOfTaste: "",
      travelHistory: "",
    });
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

      {/* Form on the Right */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg md:w-1/2"
      >
        <h2 className="text-xl font-bold mb-4">
          Take this form if you really suffer from COVID
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Upload your reports:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Do you have a cough?</label>
          <input
            type="radio"
            name="cough"
            value="yes"
            checked={formData.cough === "yes"}
            onChange={handleChange}
            required
          />{" "}
          Yes
          <input
            type="radio"
            name="cough"
            value="no"
            checked={formData.cough === "no"}
            onChange={handleChange}
            className="ml-2"
          />{" "}
          No
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Do you have a fever?</label>
          <input
            type="radio"
            name="fever"
            value="yes"
            checked={formData.fever === "yes"}
            onChange={handleChange}
            required
          />{" "}
          Yes
          <input
            type="radio"
            name="fever"
            value="no"
            checked={formData.fever === "no"}
            onChange={handleChange}
            className="ml-2"
          />{" "}
          No
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Are you experiencing fatigue?
          </label>
          <input
            type="radio"
            name="fatigue"
            value="yes"
            checked={formData.fatigue === "yes"}
            onChange={handleChange}
            required
          />{" "}
          Yes
          <input
            type="radio"
            name="fatigue"
            value="no"
            checked={formData.fatigue === "no"}
            onChange={handleChange}
            className="ml-2"
          />{" "}
          No
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Have you lost your sense of taste or smell?
          </label>
          <input
            type="radio"
            name="lossOfTaste"
            value="yes"
            checked={formData.lossOfTaste === "yes"}
            onChange={handleChange}
            required
          />{" "}
          Yes
          <input
            type="radio"
            name="lossOfTaste"
            value="no"
            checked={formData.lossOfTaste === "no"}
            onChange={handleChange}
            className="ml-2"
          />{" "}
          No
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Have you traveled recently?
          </label>
          <input
            type="radio"
            name="travelHistory"
            value="yes"
            checked={formData.travelHistory === "yes"}
            onChange={handleChange}
            required
          />{" "}
          Yes
          <input
            type="radio"
            name="travelHistory"
            value="no"
            checked={formData.travelHistory === "no"}
            onChange={handleChange}
            className="ml-2"
          />{" "}
          No
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CovidScreeningForm;
