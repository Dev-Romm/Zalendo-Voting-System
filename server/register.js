import { response } from "express";
import { voters, admins, facultyReps, delegates, classReps, reviews } from "./tables.js";

async function register(req, res) {
  const { firstname, lastname, email, password, faculty, regno } = req.body;

  try {
    if (!firstname || !lastname || !email || !password || !faculty || !regno) {
      return res.status(400).json({ message: "Input all required details" });
    }
    const user = await voters.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exits" });
    }
    const newuser = new voters({
      firstname,
      lastname,
      email,
      password,
      faculty,
      regno,
    });
    const registered_user = await newuser.save();
    res
      .status(200)
      .json({
        message: "User Registered Successfully!!!",
        registered_user: { ...registered_user._doc, password: undefined },
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function recordReview(req, res) {
  const { name, rating, review } = req.body;
  try { 
    if (!name || !rating || !review) {
      return res.status(400).json({ message: "Input all required details" });
    }
    const newReview = new reviews({
      name,
      rating,
      review
    });
    const savedReview = await newReview.save();
    res.status(200).json({ message: "Review recorded successfully", savedReview });
  } catch (error) {
    console.error("Error recording review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getResults(req, res) {
  const { electionType } = req.query; // Get the election type from the query parameters
  console.log("Election Type:", electionType); // Log the election type for debugging
  try {
    let model;

    // Determine the model based on the election type
    if (electionType === "classreps") {
      model = classReps;
    } else if (electionType === "facultyreps") {
      model = facultyReps;
    } else if (electionType === "delegates") {
      model = delegates;
    } else {
      return res.status(400).json({ message: "Invalid election type" });
    }

    const results = await model.find().sort({ votes: -1 }); // Sort by votes in descending order
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getReviews(req, res) {
  try {
    const reviewsList = await reviews.find();
    res.status(200).json({ reviews: reviewsList }); 
  }catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getVoter(req, res) {
  try {
    const users = await voters.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAdmin(req, res) {
  try {
    const users = await admins.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getFacultyReps(req, res) {
  try {
    const aspirants = await facultyReps.find();
    res.status(200).json({ aspirants });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getDelegates(req, res) {
  try {
    const aspirants = await delegates.find();
    res.status(200).json({ aspirants });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getClassReps(req, res) {
  try {
    const aspirants = await classReps.find();
    console.log(aspirants);

    res.status(200).json({ aspirants });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateVotes(req, res) {
  const { candidateId, electionType, userId } = req.body;
  console.log("Received data:", { candidateId, electionType, userId });

  try {
    // Check if the user has already voted
    const user = await voters.findById(userId);
    if (user.hasVoted) {
      return res.status(400).json({ message: "You had already voted!" });
    }

    let model;

    // Determine the model based on the election type
    if (electionType === "classreps") {
      model = classReps;
    } else if (electionType === "facultyreps") {
      model = facultyReps;
    } else if (electionType === "delegates") {
      model = delegates;
    } else {
      throw new Error("No Elections Available");
    }
    // Find the aspirant by ID and increment the votes
    const updatedAspirant = await model.findByIdAndUpdate(
      candidateId,
      { $inc: { votes: 1 } }, // Increment the votes field by 1
      { new: true } // Return the updated document
    );

    if (!updatedAspirant) {
      return res.status(404).json({ message: "Aspirant not found" });
    }

    // Mark the user as having voted
    user.hasVoted = true;
    await user.save();
    
    res
      .status(200)
      .json({
        message: "Vote updated successfully",
        aspirant: updatedAspirant
      });
  } catch (error) {
    console.error("Error updating vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}

export {
  register,
  getVoter,
  getAdmin,
  getClassReps,
  getFacultyReps,
  getDelegates,
  updateVotes,
  recordReview,
  getReviews,
  getResults
};
