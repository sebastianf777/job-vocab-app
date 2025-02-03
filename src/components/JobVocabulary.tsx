"use client";

import { useState } from "react";

const jobs = {
  chef: [
    { word: "Coltello", image: "/images/coltello.jpg", votes: 5 },
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
    <div className="p-5">
      <h1 className="text-2xl font-bold">Lavoro Vocab</h1>

      <select
        onChange={(e) => setSelectedJob(e.target.value as keyof typeof jobs)}
        className="mt-4 p-2 border"
      >
        {Object.keys(jobs).map((job) => (
          <option key={job} value={job}>
            {job.charAt(0).toUpperCase() + job.slice(1)}
          </option>
        ))}
      </select>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {jobs[selectedJob].map(({ word, image, votes }, index) => (
          <div key={index} className="border p-3 rounded shadow">
            <img src={image} alt={word} className="w-full h-32 object-cover" />
            <p className="mt-2 text-center font-semibold">{word}</p>
            <p className="text-center">Votes: {votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
