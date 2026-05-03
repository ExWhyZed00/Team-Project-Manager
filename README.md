# TaskFlow — Team Task Manager

A full-stack collaborative task management web application built with React, Node.js, Express, and MongoDB. Think of it as a simplified Trello/Asana where teams can manage projects and tasks together.

---

## 🔗 Live Demo

**Frontend:** `https://your-frontend.up.railway.app`  
**Backend API:** `https://your-backend.up.railway.app`

---
## ✨ Features

### Authentication
- Signup with name, email, password, and avatar color
- Secure login with JWT (JSON Web Tokens)
- Persistent sessions via localStorage
- Auto-redirect on token expiry

### Project Management
- Create projects with name, description, and color
- Project creator automatically becomes Admin
- Admin can add members by email
- Admin can remove members
- View all projects you're part of with progress bars

### Task Management
- Kanban board with 3 columns: To Do, In Progress, Done
- Create tasks with title, description, due date, and priority (Low / Medium / High)
- Assign tasks to project members
- Overdue task highlighting
- Admin: full CRUD on tasks
- Member: can only update status of their assigned tasks

### Dashboard
- Total tasks count
- Tasks by status breakdown with visual bar
- Team workload per user
- Overdue tasks list

### Role-Based Access Control
| Feature | Admin | Member |
|---|---|---|
| Create tasks | ✅ | ❌ |
| Delete tasks | ✅ | ❌ |
| Edit task details | ✅ | ❌ |
| Update task status | ✅ | ✅ (own tasks only) |
| Add/remove members | ✅ | ❌ |
| View project board | ✅ | ✅ |
| View dashboard | ✅ | ✅ |

---

## 🛠 Tech Stack

### Frontend
- **React 18** — UI framework
- **React Router v6** — client-side routing
- **Axios** — HTTP client
- **Vite** — build tool
- **CSS Variables** — theming and dark mode

### Backend
- **Node.js** — runtime
- **Express.js** — web framework
- **MongoDB** — database (hosted on MongoDB Atlas)
- **Mongoose** — ODM for MongoDB
- **JWT** — authentication
- **bcryptjs** — password hashing
- **CORS** — cross-origin requests

---

## 📁 Project Structure

```
TeamTaskManagerAssignment/
│
├── frontend/                   # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Axios instance with JWT interceptor
│   │   ├── components/
│   │   │   ├── AppLayout.jsx   # Auth guard + sidebar shell
│   │   │   ├── AppLayout.css
│   │   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   │   ├── Sidebar.css
│   │   │   ├── TaskModal.jsx   # Create/edit task modal
│   │   │   └── TaskModal.css
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx/.css
│   │   │   ├── Signup.jsx/.css
│   │   │   ├── Dashboard.jsx/.css
│   │   │   ├── Projects.jsx/.css
│   │   │   ├── ProjectDetail.jsx/.css
│   │   │   └── MyTasks.jsx/.css
│   │   ├── styles/
│   │   │   └── global.css      # CSS variables and resets
│   │   ├── App.jsx             # Routes
│   │   └── main.jsx            # Entry point
│   ├── .env                    # VITE_API_URL
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Express backend
    ├── middleware/
    │   └── auth.js             # JWT verification middleware
    ├── routes/
    │   ├── auth.js             # POST /signup, /login
    │   ├── projects.js         # Project + member + task routes
    │   ├── tasks.js            # PATCH, DELETE, GET /mine
    │   └── dashboard.js        # GET /dashboard stats
    ├── initDB.js               # MongoDB connection + Mongoose models
    ├── index.js                # Express app entry point
    ├── .env                    # Environment variables
    └── package.json
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)

### 1. Clone the repository

```bash
git clone https://github.com/ExWhyZed00/Team-Project-Manager.git
cd team-task-manager
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskManager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected — taskManager db ready
🚀 Server running on port 5000
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |

### Projects
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/projects` | All members | Get user's projects |
| POST | `/api/projects` | Authenticated | Create project |
| GET | `/api/projects/:id` | Members only | Get project details |
| DELETE | `/api/projects/:id` | Admin only | Delete project |
| GET | `/api/projects/:id/members` | Members only | Get members list |
| POST | `/api/projects/:id/members` | Admin only | Add member by email |
| DELETE | `/api/projects/:id/members/:userId` | Admin only | Remove member |
| GET | `/api/projects/:id/tasks` | Members only | Get project tasks |
| POST | `/api/projects/:id/tasks` | Admin only | Create task |

### Tasks
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/tasks/mine` | Authenticated | Get my assigned tasks |
| PATCH | `/api/tasks/:id` | Admin/Assignee | Update task |
| DELETE | `/api/tasks/:id` | Admin only | Delete task |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Get stats for all user's projects |

---

## 👤 Author

**Akansh Harlalka**  
Email: akanshharlalka@yahoo.com  
GitHub: [@ExWhyZed00](https://github.com/ExWhyZed00)

---

## 📄 License

This project was built as a full-stack assignment demonstrating:
- JWT-based authentication
- Role-based access control
- RESTful API design
- MongoDB with Mongoose
- React with Context API
- Deployment on Railway