import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ElectionContext, ElectionProvider } from "../contexts/Globalcontext";
import "../styles/admin.css";

export default function Admin() {
  const {
    electionType,
    setElectionType,
    duration,
    setDuration,
    startTime,
    setStartTime,
    userDetails,
    setUserDetails,
  } = useContext(ElectionContext);
  const navigate = useNavigate();

  console.log(userDetails);

  function handleAddElection(event) {
    // Logic to add an election

    event.preventDefault();
    if (electionType) {
      alert(
        `${electionType} elections have been set up successfully for ${duration} hours!`
      );
      // Here, you can send election data to your backend (e.g., via an API call)
      console.log(`Adding election for: ${electionType}`);
    } else {
      alert("Please select an election type.");
    }
  }
  function handleViewResults() {
    // Logic to view results
    console.log("Viewing election results.");
  }
  function handleElectionChange(event) {
    // Logic to handle election type change
    const value = event.target.value;

    console.log("Selected election type:", value);
    if (value === "Class Rep") {
      setElectionType("classreps");
    } else if (value === "Faculty Rep") {
      setElectionType("facultyreps");
    } else if (value === "Student Delegate") {
      setElectionType("delegates");
    }
  }
  function handleLogout() {
    // Logic to handle logout
    console.log("Logging out.");
    setUserDetails(null); // Clear user details from context
    navigate("/");
  }
  function handleReset() {
    // Logic to reset results
    console.log("Resetting election results.");
  }
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <p style={{textTransform: "capitalize"}}>Welcome, {userDetails.firstname}</p>
      <form className="admin-form" onSubmit={handleAddElection}>
        <div className="admin-form-group">
          <label>Select Election Type:</label>
          <div className="admin-radio-group">
            <label htmlFor="classRep">Class Rep</label>
            <input
              type="radio"
              name="electionType"
              id="classRep"
              value="Class Rep"
              onChange={handleElectionChange}
              checked={electionType === "classreps"}
            />

            <label htmlFor="facultyRep">Faculty Rep</label>
            <input
              type="radio"
              name="electionType"
              id="facultyRep"
              value="Faculty Rep"
              onChange={handleElectionChange}
              checked={electionType === "facultyreps"}
            />

            <label htmlFor="studentDelegate">Student Delegate</label>
            <input
              type="radio"
              name="electionType"
              id="studentDelegate"
              value="Student Delegate"
              onChange={handleElectionChange}
              checked={electionType === "delegates"}
            />
          </div>
        </div>
        <label htmlFor="duration">Set Duration:</label>
        <select
          id="duration"
          name="duration"
          onChange={(e) => {
            const selectedDuration = parseInt(e.target.value, 10);
            setDuration(selectedDuration);
            // You can also log the selected duration here if needed
            console.log("Selected duration:", selectedDuration);
            console.log("Start date:", startTime);
            console.log(
              "End date:",
              new Date(
                new Date(startTime).getTime() +
                  selectedDuration * 60 * 60 * 1000
              )
            );
          }}
          style={{ marginLeft: "10px" }}
        >
          <option value="1">1 Hour</option>
          <option value="2">2 Hours</option>
          <option value="3">3 Hours</option>
        </select>
        <button type="submit" disabled={!electionType}>
          Add Election
        </button>
      </form>
      <div className="btn-group">
        <button type="button" onClick={() => navigate("/results")}>
          View Results
        </button>
        <button type="button" onClick={() => navigate("/reviews")}>
          View User Feedback
        </button>
        <button type="button" onClick={() => handleReset}>
          Clear Results
        </button>
        <button type="button" onClick={handleLogout}>
          LOG OUT
        </button>
      </div>
    </div>
  );
}
