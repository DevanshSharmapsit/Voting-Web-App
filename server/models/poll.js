const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  options: {
    type: [optionSchema],
    validate: [(arr) => arr.length >= 2, "At least 2 options required"],
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  closingTime: {
    type: Date,
    required: true,
  },

  closedManually: {
    type: Boolean,
    default: false,
  },

  votes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      optionIndex: Number,
    },
  ],
});

module.exports = mongoose.model("Poll", pollSchema);
