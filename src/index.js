import dotenv from "dotenv";
import express from "express";
import taskRoutes from "./route.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Smart Task Manager API is running." });
});

app.use("/tasks", taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  // Handle JSON parsing errors from body-parser
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Invalid JSON payload provided in the request." });
  }

  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
