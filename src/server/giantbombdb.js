import axios from "axios";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const API_KEY = process.env.GIANTBOMB_API_KEY;
const API_BASE_URL = 'https://www.giantbomb.com/api/games/';

export async function fetchGamesFromGiantBomb(offset = 0, limit = 100) {
  try {
    const response = await axios.get(API_BASE_URL, {
    params: {
      api_key: API_KEY,
      format: 'json',
      sort: 'original_game_rating:desc',
      limit,
      offset,
    },
    headers: {
      'User-Agent': 'videogame_sentiment_react_app/1.0',
    },
  });

    console.log("✅ Giant Bomb API response:", response.data); // Add this
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching from Giant Bomb API:", error.response?.data || error.message);
    throw error;
  }
}