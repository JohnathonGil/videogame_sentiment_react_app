// src/server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchGamesFromRAWG } from './rawgdb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Endpoint to get games with optional offset and limit
app.get('/api/games', async (req, res) => {
    
  try {
    const query = req.query.search || '';  // optional search
    const data = await fetchGamesFromRAWG(query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching games:', err.message);
    res.status(500).json({ error: 'Failed to fetch games from RAWG' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
