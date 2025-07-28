import React from 'react'

const GameCard = ( { game : { name, image, original_release_date, platforms} } ) => {
  return (
    <div>
        <p className='text-white'>{name}</p>
    </div>
  )
}

export default GameCard