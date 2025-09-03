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
    const page = req.query.page || 1;
    const pageSize = req.query.page_size || 20;

  try {
    const data = await fetchGamesFromRAWG(page, pageSize);
    res.json(data);
  } catch (err) {
    console.error('Error fetching games:', err.message);
    res.status(500).json({ error: 'Failed to fetch games from RAWG' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
