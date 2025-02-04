"use client";

import { useState } from "react";

const jobs = {
  chef: [
    { word: "Coltello da cucina", image: "/images/coltello.jpg", votes: 5 },
    { word: "Forno", image: "/images/forno.jpg", votes: 3 },
  ],
  electrician: [
    { word: "Cacciavite", image: "/images/cacciavite.jpg", votes: 4 },
    { word: "Filo", image: "/images/filo.jpg", votes: 2 },
  ],
};

export default function JobVocabulary() {
  const [selectedJob, setSelectedJob] = useState<keyof typeof jobs>("chef");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lavoro Vocab 📖</h1>

      {/* Job Selector */}
      <select
        onChange={(e) => setSelectedJob(e.target.value as keyof typeof jobs)}
        className="p-3 text-lg border border-gray-300 rounded-md shadow-md"
      >
        {Object.keys(jobs).map((job) => (
          <option key={job} value={job}>
            {job.charAt(0).toUpperCase() + job.slice(1)}
          </option>
        ))}
      </select>

      {/* Word-Image Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs[selectedJob].map(({ word, image, votes }, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img src={image} alt={word} className="w-40 h-40 object-cover rounded-lg" />
            <p className="mt-3 text-xl font-semibold">{word}</p>
            <p className="text-gray-600">Votes: {votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
