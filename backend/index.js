const express = require('express');
const app = express();
const port = 4000; // Or process.env.PORT for flexibility

// In-memory store for tasks (for demonstration)
const tasks = {};
let taskIdCounter = 1; // Simple ID counter

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files (e.g., a frontend build)
// This expects a 'build' folder in the same directory as index.js (i.e., backend/build)
// If your frontend is built here, it will serve index.html on GET /
app.use(express.static('build'));

// API Welcome message for the root path if no index.html is served by express.static
app.get('/', (req, res) => {
  res.send('Welcome to the Todo App API! Try GET /api/tasks.');
});

// API Routes (consider prefixing with /api/ to differentiate from frontend routes)
app.get('/api/tasks', (req, res) => {
  res.status(200).json(Object.values(tasks)); // Send as an array of values
});

app.post('/api/tasks', (req, res) => {
  const { task_name } = req.body;

  if (!task_name) {
    return res.status(400).json({ error: 'task_name is required' });
  }

  const newTaskId = `task_${taskIdCounter++}`;
  tasks[newTaskId] = {
    task_id: newTaskId,
    task_name: task_name,
    status: "undone"
  };

  res.status(201).json(tasks[newTaskId]);
});

// Consider using PUT for updates, e.g., to change status
app.put('/api/tasks/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!tasks[id]) {
        return res.status(404).json({ error: 'Task not found' });
    }
    if (typeof status !== 'string') { // Or more specific validation
        return res.status(400).json({ error: 'Valid status is required' });
    }
    tasks[id].status = status;
    res.status(200).json(tasks[id]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  if (tasks[id]) {
    delete tasks[id];
    res.status(204).send(); // No content, successful deletion
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`Todo app backend listening at http://localhost:${port}`);
  console.log('API Endpoints:');
  console.log('GET    --- /api/tasks');
  console.log('POST   --- /api/tasks   (Body: {"task_name": "your task"})');
  console.log('PUT    --- /api/tasks/:id/status (Body: {"status": "done/undone"})');
  console.log('DELETE --- /api/tasks/:id');
  // If serving static files, GET / should serve index.html from 'build' folder
});
