const express = require("express");
const router = express.Router();
const {
  createPoll,
  getOpenPolls,
  votePoll,
  closePoll,
  getPollResults,
  getAllPolls,
  deletePoll,
  updatePoll,
} = require("../controllers/pollController");

// Create new poll (admin)
router.post("/", createPoll);

// Get all open polls (for users)
router.get("/open", getOpenPolls);

// Vote on a poll (user)
router.post("/vote/:pollId", votePoll);

// Close a poll (admin)
router.patch("/close/:pollId", closePoll);

// Get results (only if poll is closed)
router.get("/results/:pollId", getPollResults);

// Admin fetch all polls
router.get("/", getAllPolls);

// Admin delete poll
router.delete("/:pollId", deletePoll);

// Admin update poll
router.put("/:pollId", updatePoll);

module.exports = router;
