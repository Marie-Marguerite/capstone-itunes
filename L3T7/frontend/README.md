# 📝 Full-Stack To-Do App (React + Express + MongoDB)

This is a beginner-friendly **full-stack to-do list app** built using:

- 🔵 React + Redux (Frontend - using Vite)
- 🟠 Express.js (Backend - Node.js)
- 🟢 MongoDB (Database)
- 🔐 JWT Authentication

Users can register (Gmail only), log in, and manage their to-do list securely.

---

## 🚀 Features

- ✅ User registration & login (Gmail addresses only)
- ✅ JWT-based authentication
- ✅ Add, edit, delete, and toggle todos
- ✅ 140-character limit on todos
- ✅ Protected routes (only visible when logged in)
- ✅ Input validation and error messages
- ✅ Custom middleware (e.g., check request format, length)

---

## 🔧 Tech Stack

| Area     | Technology                        |
| -------- | --------------------------------- |
| Frontend | React, Redux Toolkit, Vite, Axios |
| Backend  | Node.js, Express.js, Mongoose     |
| Database | MongoDB Atlas                     |
| Auth     | JWT (JSON Web Tokens)             |
| Styling  | CSS Modules                       |

---

## Setup Instructions

### 1. Clone the Repository

````bash
git clone https://github.com/your-username/fullstack-todo-app.git
cd fullstack-todo-app

### 2. Install Dependencies
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

### 3. Configure Environment Variables
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

(Replace with your actual values.)

### 4. Start the App
Backend
cd backend
npm run dev

Frontend
cd frontend
npm run dev

---

## Routes Overview
🧑 Auth Routes (/api)
| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| POST   | `/register` | Register a new user     |
| POST   | `/login`    | Log in an existing user |

✅ Todo Routes (/todos)
| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| GET    | `/`           | Get all user's todos   |
| POST   | `/`           | Add a new todo         |
| PUT    | `/:id`        | Edit a todo            |
| DELETE | `/:id`        | Delete a todo          |
| PATCH  | `/:id/toggle` | Toggle complete status |

---

## 📁 Project Structure

```bash
.
├── backend/         # Express + MongoDB API
├── frontend/        # React + Redux (Vite)
└── README.md        # You're reading it!

Here’s a breakdown of the full-stack app folder structure and what each file/folder does:
.
├── backend/                   # Express + MongoDB backend API
│   ├── controllers/
│   │   └── authController.js         # Logic for user registration and login
│
│   ├── middleware/
│   │   ├── authenticateToken.js      # Protects routes using JWT token verification
│   │   └── requestCheck.js           # Middleware for validating request type, email domain, todo length
│
│   ├── models/
│   │   ├── User.js                   # User Mongoose model (email, password)
│   │   └── Todo.js                   # Todo Mongoose model (content, completed, user ref)
│
│   ├── routes/
│   │   ├── authRoutes.js             # Routes for user registration and login
│   │   └── todoRoutes.js             # CRUD and toggle routes for todos (protected)
│
│   ├── .env                          # (Not committed) contains environment variables like JWT_SECRET
│   └── server.js                     # Sets up Express server, connects to MongoDB, mounts routes
│
├── frontend/                 # React + Redux frontend (Vite)
│   ├── api/
│   │   └── axiosInstance.js          # Configured Axios instance with interceptors and token logic
│
│   ├── components/
│   │   ├── login/
│   │   │   ├── Login.jsx             # Login form component
│   │   │   ├── Register.jsx          # Register form component
│   │   │   ├── Landing.jsx           # Redirect logic to /home or /login
│   │   │   ├── MessageAuth.jsx       # Success/error feedback for login/register
│   │   │   └── PrivateRoute.jsx      # Protects `/home` route from unauthenticated access
│   │   │
│   │   ├── todo/
│   │   │   ├── Home.jsx              # Main todo page (form + list)
│   │   │   ├── AddTodoForm.jsx       # Input form to add todos
│   │   │   ├── MapTodos.jsx          # Maps and displays all todos
│   │   │   ├── TodoItem.jsx          # Each todo item with edit/delete/toggle logic
│   │   │   └── styles/               # CSS Modules for scoped component styling
│   │   │       └── TodoItem.module.css
│
│   ├── redux/
│   │   ├── store.js                  # Configures Redux store
│   │   ├── TodoSlice.js              # Slice for todos (list, CRUD, toggle, thunk logic)
│   │   └── UserSlice.js              # Slice for user auth (login, register, logout)
│
│   ├── App.jsx                       # Routes and redirect logic
│   ├── main.jsx                      # Renders React app
│   ├── App.css                       # Global CSS
│   └── index.html                    # HTML entry point
│
├── README.md                         # You're reading it!
├── package.json                      # Project metadata and scripts (Vite, dependencies, etc.)
└── .gitignore                        # Specifies which files/folders Git should ignore

---
## Notes on Separation of Concerns
Area	Responsibility
controllers/	Handles logic (e.g. register, login)
routes/	Sets up endpoints and middleware
models/	Defines MongoDB schema and rules
middleware/	Handles access control and request validation
redux/	Manages state logic with reducers and thunks
api/axiosInstance.js	Automatically attaches token and logs errors

## Tips
Only Gmail accounts are allowed for registration (@gmail.com)
Todos are limited to 140 characters
Token is stored in localStorage and included in API requests
Expired tokens will auto-log the user out

## Educational
This app was built for educational purposes as part of a HyperionDev Web Development Bootcamp.

Note: ChatGPT put this README file together.
````
