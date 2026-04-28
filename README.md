# 🚀 Smart Task Manager API

A modern, lightweight task management REST API built with Node.js and Express. It features an intelligent **AI-powered priority engine** using the OpenRouter API to automatically assign priorities and reasonings to tasks based on their titles and descriptions.

---

## ✨ Features

- **🧠 AI Priority Engine:** Automatically classifies new tasks as `high`, `medium`, or `low` priority using an LLM.
- **⚡ Fast & Lightweight:** Built on Express.js with an in-memory data store for blazing-fast development and testing.
- **🛡️ Error Handling:** Graceful global error handling, including robust JSON parsing safeguards.
- **🔄 Streaming Support:** Uses asynchronous streaming to efficiently communicate with the OpenRouter AI model.

---

## 🛠️ Prerequisites

Before you begin, ensure you have met the following requirements:
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (Node Package Manager)
* An active **OpenRouter API Key**

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Installation

First, navigate to the project directory and install the required dependencies:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory of your project. You can copy the variables below and add your own OpenRouter API key:

```env
# Server Port (Defaults to 3000 if omitted)
PORT=3000

# Your OpenRouter API Key (Required for the AI Service)
OPENROUTER_API_KEY=your_api_key_here
```

### 3. Running the Server

You can start the server in either production or development mode:

**Start the server (Standard mode):**
```bash
npm start
```

**Start the server (Development mode with auto-reload):**
```bash
npm run dev
```

If successful, you should see the following output in your terminal:
```
Server running on http://localhost:3000
```

---

## 📡 API Endpoints

The API base URL is `http://localhost:3000`

### 1. List All Tasks
Retrieve a list of all current tasks in the system.

**Request:**
`GET /tasks`

**Response (200 OK):**
```json
{
  "count": 1,
  "tasks": [
    {
      "id": 1,
      "title": "Fix critical login bug",
      "description": "Users cannot auth on mobile",
      "status": "pending",
      "priority": "high",
      "reasoning": "The login bug prevents users from authenticating...",
      "createdAt": "2026-04-28T17:50:38.474Z",
      "updatedAt": "2026-04-28T17:50:38.474Z"
    }
  ]
}
```

### 2. Create a New Task
Create a new task. The AI service will automatically analyze the title and description to determine the priority.

**Request:**
`POST /tasks`
```json
{
  "title": "Update README",
  "description": "Add better setup documentation"
}
```

**Response (201 Created):**
```json
{
  "task": {
    "id": 2,
    "title": "Update README",
    "description": "Add better setup documentation",
    "status": "pending",
    "priority": "medium",
    "reasoning": "Updating documentation is important but not urgent...",
    "createdAt": "2026-04-28T17:51:33.533Z",
    "updatedAt": "2026-04-28T17:51:33.533Z"
  }
}
```

### 3. Mark Task as Complete
Update the status of a specific task to `completed`.

**Request:**
`PATCH /tasks/:id`
*(No request body needed)*

**Response (200 OK):**
```json
{
  "task": {
    "id": 2,
    "title": "Update README",
    "description": "Add better setup documentation",
    "status": "completed",
    "priority": "medium",
    "reasoning": "Updating documentation is important but not urgent...",
    "createdAt": "2026-04-28T17:51:33.533Z",
    "updatedAt": "2026-04-28T17:55:47.031Z"
  }
}
```

---

## 🏗️ Project Structure

```text
├── src/
│   ├── index.js        # Main application entry point & Express setup
│   ├── route.js        # API route definitions
│   ├── aiService.js    # OpenRouter API integration & AI logic
│   └── taskStore.js    # In-memory data structures and CRUD operations
├── .env                # Environment variables (not tracked by git)
├── package.json        # Project metadata and scripts
├── DECISION_LOG.md     # Developer notes, tradeoffs, and AI usage details
└── README.md           # Setup and run instructions
```
