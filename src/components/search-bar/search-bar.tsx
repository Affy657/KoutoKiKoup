import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { filterKnives, autocompleteKnives, fetchKnives } from '../../api/api';
import './search-bar.css';

interface SearchAppBarProps {
  readonly onSearchResults: (results: string[]) => void;
}

export default function SearchAppBar({ onSearchResults }: SearchAppBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue) {
        const results = await autocompleteKnives(inputValue);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
}, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      let results;
      if (inputValue) {
        results = await filterKnives({ name: inputValue });
      } else {
        results = await fetchKnives();
      }
      onSearchResults(results);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="search-container">
        <div className="search-icon-wrapper">
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          className="styled-input-base"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
        />
        {suggestions.length > 0 && (
          <div className="suggestions-container">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item" onClick={() => setInputValue(suggestion)}>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </Box>
  );
}
