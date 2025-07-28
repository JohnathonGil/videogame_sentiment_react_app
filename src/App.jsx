import React, { useState, useEffect } from 'react'
import Search from './client/components/search'
import Spinner from './client/components/Spinner';
import GameCard from './client/components/GameCard';

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gameList, setGameList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = async () => {

    setIsLoading(true);
    setErrorMessage('');
      
    try {
      const response = await fetch('http://localhost:3001/api/games');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Giant Bomb returns data with a `results` array — no `response: 'False'`
      if (!data.results || data.results.length === 0) {
        setErrorMessage('No games found.');
        setGameList([]);
        return;
      }

      setGameList(data.results);
    
      // setGames(data); etc.
    } catch (error) {
      console.error(`Error fetching games: ${error}`);
      setErrorMessage('Error fetching games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
};

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
          <h2 className='mt-[40px]'>All Games</h2>

          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {gameList.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}

export default App