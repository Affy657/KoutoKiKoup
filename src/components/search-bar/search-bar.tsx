import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { filterKnives, autocompleteKnives, fetchKnives } from '../../api/api';
import './search-bar.css';
import { Knife } from '../../type';

interface SearchAppBarProps {
  readonly onSearchResults: (results: Knife[] | null) => void;
}

export default function SearchAppBar({ onSearchResults }: SearchAppBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue) {
        const results = await autocompleteKnives(inputValue);
        setSuggestions(results.slice(0, 5));
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
      handleSearchResults();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearchResults();
  };

  const handleSearchResults = async () => {
    if (inputValue) {
      const results = await filterKnives({ name: inputValue });
      onSearchResults(results); 
    } else {
      const allKnives = await fetchKnives();
      onSearchResults(allKnives); 
    }
    setSuggestions([]);
  }

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
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)} 
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </Box>
  );
}
