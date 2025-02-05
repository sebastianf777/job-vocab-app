"use client";

import { useState, useEffect } from "react";

const initialJobs = {
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
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState<keyof typeof jobs>("chef");
  const [votedItems, setVotedItems] = useState<{ [key: string]: boolean }>({});

  // Load stored votes from localStorage
  useEffect(() => {
    const storedVotes = localStorage.getItem("votedItems");
    if (storedVotes) {
      try {
        const parsedVotes = JSON.parse(storedVotes) as { [key: string]: boolean };
        setVotedItems(parsedVotes);
      } catch (error) {
        console.error("Error parsing localStorage:", error);
        setVotedItems({});
      }
    }
  }, []);

  // Function to handle voting
  const handleLike = (index: number) => {
    const voteKey = `${selectedJob}-${index}`;
    const hasLiked: boolean = votedItems[voteKey] ?? false;

    setJobs((prevJobs) => ({
      ...prevJobs,
      [selectedJob]: prevJobs[selectedJob].map((item, i) => {
        if (i !== index) return item; // Keep other items unchanged

        let newVotes = item.votes;

        // If already liked, remove the like
        if (hasLiked) {
          newVotes -= 1;
        } else {
          newVotes += 1;
        }

        return { ...item, votes: newVotes };
      }),
    }));

    // Toggle like state in storage
    const updatedVotes: { [key: string]: boolean } = { ...votedItems, [voteKey]: !hasLiked };
    setVotedItems(updatedVotes);
    localStorage.setItem("votedItems", JSON.stringify(updatedVotes));
  };


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

            {/* Vote Buttons */}
            <div className="flex gap-4 mt-3">
              <button
                className={`px-3 py-1 rounded-md ${votedItems[`${selectedJob}-${index}`] ? " border border-red-500 hover:bg-gray-300" : "bg-red-300 hover:bg-red-500"
                  } text-black`}
                onClick={() => handleLike(index)}
              >
                <span>
                {votedItems[`${selectedJob}-${index}`] ? "❤️" : "🤍"}
                </span>
              </button>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
