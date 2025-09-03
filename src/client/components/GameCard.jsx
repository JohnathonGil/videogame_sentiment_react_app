import React from 'react'

const GameCard = ( { game : { name, background_image, released, rating, platform} } ) => {
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
            </div>
            <span>◙</span>
        </div>

    </div>
  )
}

export default GameCard