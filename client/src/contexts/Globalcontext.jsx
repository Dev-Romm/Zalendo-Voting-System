import { createContext, useState } from "react";


export const ElectionContext = createContext(null);

export function ElectionProvider ({ children }) {
    const [electionType, setElectionType] = useState("classreps");
    const [userDetails, setUserDetails] = useState("");
    const [duration, setDuration] = useState(1);
    const [startTime, setStartTime] =  useState(new Date().toLocaleString());
    const [hasVoted, setHasVoted] = useState(false);
  
    return (
      <ElectionContext.Provider value={{ electionType, setElectionType, userDetails, setUserDetails, hasVoted, setHasVoted, duration, setDuration, startTime, setStartTime }}>
        {children}
      </ElectionContext.Provider>
    );
  };

