const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const TASKS_FILE = 'tasks.json';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load tasks from file if exists
let tasks = [];
let nextId = 1;

if (fs.existsSync(TASKS_FILE)) {
  try {
    tasks = JSON.parse(fs.readFileSync(TASKS_FILE));
    nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  } catch (err) {
    console.error('Failed to load tasks from file:', err);
  }
}

// Helper: save tasks to file
function saveTasksToFile() {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API Routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = {
    id: nextId++,
    title: req.body.title,
    priority: req.body.priority || 'medium',
    category: req.body.category || 'personal',
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  saveTasksToFile();
  res.status(201).json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const beforeLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === beforeLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  saveTasksToFile();
  res.status(204).send();
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  Object.assign(task, req.body);
  saveTasksToFile();
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`TaskFlow server running on port ${PORT}`);
});
