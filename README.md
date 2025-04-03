
# Task Mastery - Todo Application

A full-stack todo list application built with React, Express, Node.js, and MySQL with Sequelize.

## Features

- Create, read, update, and delete tasks
- Set task priorities and statuses
- Filter tasks by status, priority, or search term
- Set due dates for tasks
- Clean, responsive UI

## Tech Stack

### Frontend
- React
- TypeScript
- TanStack Query for data fetching and state management
- Shadcn UI components
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MySQL database
- Sequelize ORM

## Setup Instructions

1. **Database Setup**
   - Install MySQL if not already installed
   - Create a new MySQL database named `tododb`
   - Update database credentials in `src/server/config/db.config.js` if needed

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   - In one terminal, start the frontend:
   ```bash
   npm run dev
   ```
   - In another terminal, start the backend:
   ```bash
   node src/server/server.js
   ```

4. **Access the Application**
   - Frontend: Open your browser and navigate to http://localhost:8080
   - Backend API: Running at http://localhost:5000

## API Endpoints

- **GET /api/todos** - Get all todos
- **GET /api/todos/:id** - Get a specific todo
- **POST /api/todos** - Create a new todo
- **PUT /api/todos/:id** - Update a todo
- **DELETE /api/todos/:id** - Delete a todo
- **GET /api/todos/completed** - Get all completed todos

## Environment Variables

Create a `.env` file in the root directory with the following variables if you want to customize:

```
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database_name
PORT=backend_port
```
