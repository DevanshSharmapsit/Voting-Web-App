const Poll = require("../models/poll");

const createPoll = async (req, res) => {
  try {
    const { question, options, closingTime, createdBy } = req.body;

    if (!question || options.length < 2 || !closingTime) {
      return res
        .status(400)
        .json({ message: "All fields are required with at least 2 options." });
    }

    const poll = new Poll({
      question,
      options: options.map((text) => ({ text })),
      closingTime,
      createdBy,
    });

    await poll.save();
    res.status(201).json({ message: "Poll created", poll });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating poll", error: err.message });
  }
};

const getOpenPolls = async (req, res) => {
  try {
    const now = new Date();
    const polls = await Poll.find({
      closingTime: { $gt: now },
      closedManually: false,
    }).select("-votes");
    res.json(polls);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching polls", error: err.message });
  }
};

const votePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { userId, optionIndex } = req.body;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const now = new Date();
    if (poll.closingTime < now || poll.closedManually)
      return res.status(403).json({ message: "Poll is closed" });

    const alreadyVoted = poll.votes.find(
      (vote) => vote.user.toString() === userId
    );
    if (alreadyVoted)
      return res.status(403).json({ message: "You have already voted" });

    poll.options[optionIndex].votes += 1;
    poll.votes.push({ user: userId, optionIndex });
    await poll.save();

    res.json({ message: "Vote recorded" });
  } catch (err) {
    res.status(500).json({ message: "Error voting", error: err.message });
  }
};

const closePoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    poll.closedManually = true;
    await poll.save();

    res.json({ message: "Poll closed manually" });
  } catch (err) {
    res.status(500).json({ message: "Error closing poll", error: err.message });
  }
};

const getPollResults = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { userId } = req.query;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const userVoted = poll.votes.find(
      (vote) => vote.user.toString() === userId
    );
    const now = new Date();

    if (!userVoted)
      return res.status(403).json({ message: "Vote first to see results" });
    if (poll.closingTime > now && !poll.closedManually)
      return res.status(403).json({ message: "Poll is still open" });

    res.json({
      question: poll.question,
      results: poll.options.map((opt) => ({
        option: opt.text,
        votes: opt.votes,
      })),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching results", error: err.message });
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting polls", error: err.message });
  }
};

const deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    await Poll.findByIdAndDelete(pollId);
    res.json({ message: "Poll deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting poll", error: err.message });
  }
};

const updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { question, options, closingTime } = req.body;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    if (question) poll.question = question;
    if (options && options.length >= 2)
      poll.options = options.map((text) => ({ text, votes: 0 }));
    if (closingTime) poll.closingTime = closingTime;

    await poll.save();
    res.json({ message: "Poll updated", poll });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating poll", error: err.message });
  }
};

module.exports = {
  createPoll,
  getOpenPolls,
  votePoll,
  closePoll,
  getPollResults,
  getAllPolls,
  deletePoll,
  updatePoll,
};
