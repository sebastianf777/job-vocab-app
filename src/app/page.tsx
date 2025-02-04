import JobVocabulary from "../components/JobVocabulary";

export default function Home() {
  return (
    <div>
      {/* 🔵 TEST: If this appears blue and large, Tailwind is working */}
      <h1 className="text-4xl text-blue-600 font-bold">Hello Tailwind!</h1>

      {/* Now render the JobVocabulary component */}
      <JobVocabulary />
    </div>
  );
}
