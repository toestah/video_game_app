const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API endpoints for save file management
app.get('/api/saves', (req, res) => {
  // In a real app, this would query a database
  // For now, we'll let the client handle localStorage
  res.json({ message: 'Using client-side localStorage for prototype' });
});

app.post('/api/saves', (req, res) => {
  // Future: Save to database
  res.json({ success: true, message: 'Save created' });
});

app.delete('/api/saves/:id', (req, res) => {
  // Future: Delete from database
  res.json({ success: true, message: 'Save deleted' });
});

// Serve the main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎮 Game server running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop`);
});
