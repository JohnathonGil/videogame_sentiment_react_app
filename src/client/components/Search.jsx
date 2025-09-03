import React, {useState} from 'react'

const Search = ({searchTerm, setSearchTerm}) => {

const [input, setInput] = useState('');
 
 const handleSubmit = (e) => {
    e.preventDefault();          // stops page reload
    onSearch(input.trim());      // pass search term up
  };

  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search"/>

            <input
            type="text"
            placeholder='Search through hundreds of video games'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search