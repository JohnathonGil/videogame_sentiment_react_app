const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

let accessToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpiry) return accessToken;

  const res = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    }
  });

  accessToken = res.data.access_token;
  tokenExpiry = now + res.data.expires_in * 1000;
  return accessToken;
}

async function fetchGamesFromIGDB() {
  const token = await getAccessToken();

  const res = await axios.post(
    'https://api.igdb.com/v4/games',
    'fields name,genres.name,first_release_date; limit 10;',
    {
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    }
  );

  return res.data;
}

module.exports = { fetchGamesFromIGDB };