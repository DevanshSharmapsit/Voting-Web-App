# 🗳️ Voting Web App

A full-stack web application that allows admins to create and manage polls, while users can vote and view results after polls close. Built using React, Node.js, Express, and MongoDB.

---

## 🚀 Features

### 👤 User
- Register/Login
- View all open polls
- Vote once per poll
- View poll results (after poll closes)

### 🛠️ Admin
- Create new polls with multiple options
- Set poll closing time
- Manually close or delete polls
- View results of all closed polls

### 📊 Results
- Static summary chart (Bar graph)
- Visual clarity on vote counts per option

---

## 🧰 Tech Stack

| Frontend      | Backend       | Database |
|---------------|---------------|----------|
| React.js      | Node.js       | MongoDB  |
| react-router  | Express.js    | Mongoose |
| Chart.js      | CORS, dotenv  | Atlas    |

---

## 📦 Setup Instructions

### 1. Clone the Repository

git clone https://github.com/DevanshSharmapsit/Voting-Web-App.git
cd Voting-Web-App


2. Setup Backend (/server)

cd server
npm install

Create .env in /server:

PORT=8000
MONGO_URI=your_mongodb_connection_string

Then run:

npm start

3. Setup Frontend (/client)

cd ../client
npm install
npm start

Frontend will open at http://localhost:3000

📂 Folder Structure

Voting-Web-App/
├── client/         # React frontend
├── server/         # Express backend
├── README.md


👨‍💻 Author
Devansh Sharma
Email: sdevansh057@gmail.com
GitHub: @DevanshSharmapsit

---
