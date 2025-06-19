import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [polls, setPolls] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetchPolls();
  }, [navigate, user]);

  const fetchPolls = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/polls/open");
      setPolls(res.data);
    } catch (err) {
      console.error("Error fetching polls", err);
    }
  };

  const handleDelete = async (pollId) => {
    if (!window.confirm("Are you sure you want to delete this poll?")) return;

    try {
      await axios.delete(
        `https://voting-backend-yxqt.onrender.com/api/polls/${pollId}`
      );
      fetchPolls();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleClose = async (pollId) => {
    try {
      await axios.patch(`https://voting-backend-yxqt.onrender.com/api/polls/close/${pollId}`);
      alert("Poll closed!");
      fetchPolls();
    } catch (err) {
      alert("Close failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Welcome, {user?.name}</h2>
      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>

      {user.role === "admin" && (
        <div style={{ marginTop: "20px" }}>
          <Link to="/create">
            <button className="btn-primary">Create New Poll</button>
          </Link>
        </div>
      )}

      <h3 style={{ marginTop: "30px" }}>Open Polls:</h3>
      {polls.length === 0 ? (
        <p>No open polls available.</p>
      ) : (
        <ul>
          {polls.map((poll) => (
            <li key={poll._id} style={{ marginBottom: "20px" }}>
              <strong>{poll.question}</strong>
              <br />
              <Link to={`/vote/${poll._id}`}>
                <button style={{ marginTop: "8px" }}>Vote</button>
              </Link>

              {user.role === "admin" && (
                <div style={{ marginTop: "10px" }}>
                  {/* Edit button can later open a form */}
                  {/* <button style={{ marginRight: "10px" }}>Edit</button> */}
                  <button
                    style={{
                      marginRight: "10px",
                      backgroundColor: "orange",
                      color: "white",
                    }}
                    onClick={() => handleClose(poll._id)}
                  >
                    Close Poll
                  </button>
                  <button
                    style={{ backgroundColor: "crimson", color: "white" }}
                    onClick={() => handleDelete(poll._id)}
                  >
                    Delete Poll
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
