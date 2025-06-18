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


---

## ✅ 2. 🧰 **Technologies Used and Why**


## 🧰 Technologies Used

| Technology    | Why It Was Used                                 |
|---------------|--------------------------------------------------|
| React.js      | For building fast and dynamic frontend UI        |
| React Router  | For navigation and routing between pages         |
| Axios         | For making HTTP requests from frontend to backend|
| Node.js       | To build a scalable backend with Express.js      |
| Express.js    | Minimal web framework for routing & APIs         |
| MongoDB Atlas | Cloud database to store users, polls, and votes  |
| Mongoose      | To model data and perform database operations    |
| Chart.js      | For showing poll result bar charts               |
| Vercel        | Hosting frontend easily with CI/CD               |
| Render        | Hosting backend Node.js API                      |

✅ 3. 📊 ER Diagram (Text Format)

## 📊 Entity Relationship (ER) Diagram

**User**
- id (ObjectId)
- name (String)
- email (String)
- password (String)
- role (admin/user)

**Poll**
- id (ObjectId)
- question (String)
- options (Array of { text: String, votes: Number, voters: [UserID] })
- createdBy (UserID)
- closingTime (Date)
- status (open/closed)

**Relationships**
- A user can vote in many polls
- A poll belongs to an admin (createdBy)
- Polls contain multiple options
- Each option tracks voters and vote count

✅ 4. 📬 API Endpoints List

## 📬 API Endpoints

### 🧑‍💻 Auth
| Method | Route                        | Purpose               |
|--------|------------------------------|------------------------|
| POST   | /api/auth/register           | Register user         |
| POST   | /api/auth/login              | Login user            |

---

### 🗳️ Polls
| Method | Route                             | Purpose                            |
|--------|-----------------------------------|-------------------------------------|
| POST   | /api/polls                        | Create poll (admin only)           |
| GET    | /api/polls/open                   | Get all open polls                 |
| GET    | /api/polls/:id                    | Get single poll                    |
| POST   | /api/polls/vote/:id               | Submit vote                        |
| GET    | /api/polls/results/:id            | View results (after poll closes)   |
| PATCH  | /api/polls/close/:id              | Manually close poll (admin only)   |
| DELETE | /api/polls/:id                    | Delete poll (admin only)           |



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
