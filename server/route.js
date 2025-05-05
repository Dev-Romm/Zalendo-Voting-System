import {Router} from "express";
import { register, getAdmin, getVoter, getFacultyReps, getDelegates, getClassReps, updateVotes, recordReview, getReviews, getResults } from "./register.js";

const router = Router();
router.post("/signup", register);
router.get("/voter", getVoter);
router.get("/admin", getAdmin);
router.get("/facultyreps", getFacultyReps);
router.get("/classreps", getClassReps);
router.get("/delegates", getDelegates);
router.post("/vote", updateVotes);
router.post("/review", recordReview);
router.get("/reviews", getReviews);
router.get("/results", getResults);

export default router;
