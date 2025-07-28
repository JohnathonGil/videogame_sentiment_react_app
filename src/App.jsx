import React, { useState, useEffect } from 'react'
import Search from './client/components/search'

const API_BASE_URL = 'https://api.igdb.com/v4/';

const CLIENT_ID = import.meta.env.VITE_IGDB_CLIENT_ID;
const API_KEY = import.meta.env.VITE_IGDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Client-ID': `${CLIENT_ID}`,
    'Authorization': `Bearer ${API_KEY}`,
  } 
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const fetchGames = async () => {
    try {
      const endpoint = `${API_BASE_URL}/games`

      const response = await fetch(endpoint, API_OPTIONS);

      alert(response);

    } catch (error) {
      console.error(`Error fetching games: ${error}`);
      setErrorMessage('Error fetching games Please try again later.');
    }
  }

  useEffect(() => {
    fetchGames();
  }, [])


  return (
    <main>

      <div className='pattern'></div>
      
      <div className='wrapper'>
        <header>
          <img src="./covers.png" alt="Hero Banner"/>
          <h1>
            Find The Best <span className='text-gradient'>Video Games</span> To Play With Out An Issue
          </h1>
           <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
        </header>

        <section className='all-games'>
          <h2>All Games</h2>

        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </section>

      </div>
    </main>
  )
}

export default App