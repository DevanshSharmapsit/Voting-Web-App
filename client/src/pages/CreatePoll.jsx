import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [closingTime, setClosingTime] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) setOptions([...options, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !question ||
      options.filter((o) => o.trim() !== "").length < 2 ||
      !closingTime
    ) {
      return alert("Please fill all fields with at least 2 options.");
    }

    try {
      await axios.post("http://localhost:8000/api/polls", {
        question,
        options: options.filter((o) => o.trim() !== ""),
        closingTime,
        createdBy: user.id,
      });

      alert("Poll created successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating poll");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Create New Poll</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            required={i < 2}
          />
        ))}

        {options.length < 5 && (
          <button type="button" onClick={addOption}>
            Add Option
          </button>
        )}

        <input
          type="datetime-local"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          required
        />

        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default CreatePoll;
