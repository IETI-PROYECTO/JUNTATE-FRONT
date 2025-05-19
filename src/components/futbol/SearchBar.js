import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar"
        className="search-input"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit" className="search-button" aria-label="Buscar">
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBar;