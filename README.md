# TaskTrack - MERN Stack Task Management Application

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Clerk for authentication.

## Features

- 🔐 Secure user authentication with Clerk
- ✅ Create, read, update, and delete tasks
- 🎯 Set priority levels (Low, Medium, High)
- 📅 Add due dates to tasks
- ✨ Mark tasks as completed
- 🎨 Color-coded priority levels
- 📱 Responsive design

## Technology Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Clerk for authentication
- Axios for API requests
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Clerk SDK for Node.js
- CORS middleware

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account
- Clerk account for authentication

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/tasktrack.git
cd tasktrack
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory
```env
CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
MONGODB_URI=your_mongodb_connection_string
```

5. Create a `.env` file in the frontend directory
```env
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
tasktrack/
├── backend/                # Backend server
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── index.js          # Server entry point
│
└── frontend/             # React frontend
    ├── public/
    └── src/
        ├── components/   # React components
        ├── pages/        # Page components
        └── App.jsx       # Root component
```

## Dependencies

### Frontend Dependencies
```json
{
  "dependencies": {
    "@clerk/clerk-react": "^5.21.0",
    "axios": "^1.7.9",
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "vite": "^6.0.5"
  }
}
```

### Backend Dependencies
```json
{
  "dependencies": {
    "@clerk/clerk-sdk-node": "^5.1.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongodb": "^6.12.0",
    "mongoose": "^8.9.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

## Features Implementation

### Authentication
- Implemented using Clerk
- Protected routes for authenticated users
- Secure token-based API requests

### Task Management
- Create new tasks with name, priority, and due date
- Toggle task completion status
- Delete existing tasks
- Filter and organize tasks by priority

## Learning Outcomes

This project was built to learn:
- MongoDB database operations
- RESTful API development with Express.js
- React frontend development
- Authentication implementation
- Full-stack application architecture
- State management in React
- API integration with Axios

## Future Improvements

- [ ] Task categories/tags
- [ ] Task search functionality
- [ ] Task sorting options
- [ ] Due date reminders
- [ ] Task sharing between users
- [ ] Dark mode support

## License

This project is open source and available under the MIT License.
