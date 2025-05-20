import { createContext, useEffect, useState } from "react";

export const ElectionContext = createContext(null);

export function ElectionProvider({ children }) {
  // Retrieve initial values from local storage or set defaults
  const [electionType, setElectionType] = useState(
    localStorage.getItem("electionType") || "classreps"
  );
  const API_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5002"
    : "https://zalendo-voting-backend-fye9c3djeqekf7ev.centralus-01.azurewebsites.net";
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || {}
  );
  const [duration, setDuration] = useState(
    parseInt(localStorage.getItem("duration"), 10) || 5
  );
  const [startTime, setStartTime] = useState(
    localStorage.getItem("startTime") || new Date().toLocaleString()
  );
  const [endTime, setEndTime] = useState(
    localStorage.getItem("endTime") || null
  );
  const [hasVoted, setHasVoted] = useState(
    JSON.parse(localStorage.getItem("hasVoted")) || false
  );

  // Update local storage whenever context values change
  useEffect(() => {
    localStorage.setItem("electionType", electionType);
  }, [electionType]);

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  useEffect(() => {
    localStorage.setItem("duration", duration);
  }, [duration]);

  useEffect(() => {
    localStorage.setItem("startTime", startTime);
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem("endTime", endTime);
  }, [endTime]);

  useEffect(() => {
    localStorage.setItem("hasVoted", JSON.stringify(hasVoted));
  }, [hasVoted]);

  return (
    <ElectionContext.Provider
      value={{
        electionType,
        setElectionType,
        userDetails,
        setUserDetails,
        hasVoted,
        setHasVoted,
        duration,
        setDuration,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        API_URL
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
}
