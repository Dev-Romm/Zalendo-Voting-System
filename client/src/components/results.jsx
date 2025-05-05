import { useContext, useEffect, useState } from "react";
import { ElectionContext } from "../contexts/Globalcontext";
import axios from "axios";

export default function Results() {
  // State to hold the election results
  const [results, setResults] = useState([]);
  const [electionName, setElectionName] = useState("");
  const { electionType } = useContext(ElectionContext);
  const faculties = [
    "Computing and Information Technology",
    "Engineering",
    "Media and Communication",
    "Business and Commerce",
    "Social Sciences and Technology",
    "Science and Technology"
  ];
  console.log("Election Type:", electionType);

  

  async function fetchResults() {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/results?electionType=${electionType}`
      );
      setResults(response.data.results);
        console.log("Fetched results:", response.data.results);
      console.log("Results:", results);
      // Process and display the results as needed
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }

  

  // Call the fetchResults function when the component mounts
  // to fetch the election results from the server
  useEffect(() => {
    if (!electionType) return; // Exit if electionType is not set
    fetchResults();
    if (electionType === "facultyreps") {
        setElectionName("Faculty Reps");
        
      } else if (electionType === "classreps") {
        setElectionName("Class Reps");
        
      } else if (electionType === "delegates") {
        setElectionName("Delegates");
        
      }
  }, [electionType]);

  return (
    <div className="results-container">
      <h2>Election Results</h2>
      <p>Election Type: {electionName || "Unknown"}</p>
      <div className="result-cards">
        {faculties.map((faculty, index) => (
          <div key={index}>
            <h3>{faculty}</h3>
            {results && results.length
              ? results
                  .filter((result) => result.faculty === faculty)
                  .map((result) => (
                    <div className="result-card" key={result._id}>
                      <p className="result-name">
                        {result.name}
                      </p>
                      <p className="result-votes">
                        Votes: <span>{result.votes}</span>
                      </p>
                    </div>
                  ))
              : <p>No results available for this faculty.</p>}
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => window.history.back()}>
        Back to Dashboard
      </button>
    </div>
  );
}
