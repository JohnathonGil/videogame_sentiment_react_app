import axios from "axios";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const API_BASE_URL = 'https://api.rawg.io/api/games';

export async function fetchGamesFromRAWG(page = 1, page_size=20) {
  try {
    const response = await axios.get(API_BASE_URL, {
    params: {
        key: RAWG_API_KEY,
        page,
        page_size,
        ordering: '-rating', // Descending order by user rating
      },
  });

    console.log("✅ RAWG API response:", response.data); // Add this
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching from RAWG API:", error.response?.data || error.message);
    throw error;
  }
}