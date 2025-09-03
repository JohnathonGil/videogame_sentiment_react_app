import React from 'react'

const GameCard = ( { game : { name, background_image, released, rating, esrb_rating} } ) => {
  return (
    <div className="game-card">
        <div className="image-container">
          <img src={background_image || '/no-game.png'} alt={name} />
        </div>
        <div className='mt-4'>
            <h3>{name}</h3>
            <div className='content'>
                <div className='rating'>
                    <img src="star.svg" alt="Star Icon"/>
                    <p>{rating || 'N/A'}</p>
                </div>
                <span>•</span>
                <p className='esrbrating'>{esrb_rating?.name || 'Unrated'}</p> 
                <span>•</span>
                <p className='year'>{released ? released.split('-')[0] : 'N/A'}</p>
            </div>
        </div>

    </div>
  )
}

export default GameCard