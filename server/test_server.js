const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/scenes.json'), 'utf8'));

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api/scenes', (req, res) => {
  res.json({
    success: true,
    data: data.scenes.map(s => ({
      id: s.id, name: s.name, category: s.category,
      description: s.description, difficulty: s.difficulty,
      estimated_time: s.estimated_time
    }))
  });
});

app.listen(3000, () => {
  console.log('AntiScam demo server running on http://localhost:3000');
  console.log('Available scenes:', data.scenes.map(s => s.id).join(', '));
});