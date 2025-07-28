// src/server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchGamesFromGiantBomb } from './giantbombdb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Endpoint to get games with optional offset and limit
app.get('/api/games', async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const games = await fetchGamesFromGiantBomb(offset, limit);
    res.json(games);
  } catch (err) {
    console.error('Error fetching games:', err.message);
    res.status(500).json({ error: 'Failed to fetch games from Giant Bomb' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
