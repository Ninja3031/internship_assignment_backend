import express from "express";
import { getAllTasks, createTask, markTaskComplete } from "./taskStore.js";
import { suggestPriority } from "./aiService.js";

const router = express.Router();

// GET /tasks — List all tasks
router.get("/", (req, res) => {
  const tasks = getAllTasks();
  res.json({ count: tasks.length, tasks });
});

// POST /tasks — Create a new task with priority suggestion
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      error: "title is required and must be a non-empty string."
    });
  }

  const { priority, reasoning } = await suggestPriority(title, description);

  const task = createTask({
    title: title.trim(),
    description,
    priority,
    reasoning
  });

  res.status(201).json({ task });
});

// PATCH /tasks/:id — Mark a task as complete
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Task ID must be a number." });
  }

  const task = markTaskComplete(id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${id} not found.` });
  }

  res.json({ task });
});

export default router;