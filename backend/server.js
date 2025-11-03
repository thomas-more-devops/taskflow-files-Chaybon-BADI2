const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 3000;

// Mongoose connect options (voorkom harde crash als DB nog niet klaar)
const mongoUri = `mongodb://${process.env.DB_HOST || 'database'}:27017/${process.env.DB_NAME || 'taskflow'}`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Verbonden met MongoDB'))
  .catch(err => console.error('MongoDB fout bij connect:', err));

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' });
});

// Task routes
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend draait op poort ${PORT}`);
});
