const tasks = [];
let nextId = 1;

export function getAllTasks() {
  return tasks;
}

export function getTaskById(id) {
  return tasks.find((t) => t.id === id);
}

export function createTask({ title, description, priority, reasoning }) {
  const task = {
    id: nextId++,
    title,
    description: description || null,
    status: "pending",
    priority,
    reasoning,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(task);
  return task;
}

export function markTaskComplete(id) {
  const task = getTaskById(id);
  if (!task) return null;

  task.status = "completed";
  task.updatedAt = new Date().toISOString();

  return task;
}