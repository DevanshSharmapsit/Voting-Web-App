import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ResultChart from "../components/ResultChart";
import "../App.css"; // for styling

const VotePoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    let intervalId;

    const fetchPollStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/polls/open`);
        const foundPoll = res.data.find((p) => p._id === id);

        if (foundPoll) {
          setPoll(foundPoll);
        } else {
          const resultRes = await axios.get(
            `http://localhost:8000/api/polls/results/${id}?userId=${user.id}`
          );
          setResults(resultRes.data.results || []);
          setPoll({ question: resultRes.data.question });
          clearInterval(intervalId);
        }
      } catch (err) {
        setError("Error checking poll status or loading results.");
      }
    };

    fetchPollStatus();
    intervalId = setInterval(fetchPollStatus, 5000);

    return () => clearInterval(intervalId);
  }, [id, navigate, user]);

  const handleVote = async () => {
    if (selectedOption === null) {
      alert("Please select an option.");
      return;
    }

    try {
      await axios.post(`http://localhost:8000/api/polls/vote/${id}`, {
        userId: user.id,
        optionIndex: selectedOption,
      });
      alert("Vote submitted!");
    } catch (err) {
      setError(err.response?.data?.message || "Vote failed.");
    }
  };

  return (
    <div className="container">
      <div className="poll-card">
        <h2 className="poll-title">{poll?.question || "Loading..."}</h2>
        {error && <p className="error-text">{error}</p>}

        {!results && poll?.options && (
          <div className="options">
            {poll.options.map((opt, idx) => (
              <label key={idx} className="option-label">
                <input
                  type="radio"
                  name="option"
                  value={idx}
                  onChange={() => setSelectedOption(idx)}
                />
                {opt.text}
              </label>
            ))}
            <button className="btn-primary" onClick={handleVote}>
              Submit Vote
            </button>
          </div>
        )}

        {results && (
          <div className="results-section">
            <h3>Poll Results</h3>
            <ResultChart results={results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VotePoll;
