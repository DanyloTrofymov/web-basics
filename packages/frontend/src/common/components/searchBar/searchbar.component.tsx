import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { useDebounce } from '../../../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      handleSearch();
    }
  }, [debouncedSearchTerm]);

  return (
    <Box sx={{ ml: 'auto' }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <i className="fa fa-search" />
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
};

export default SearchBar;
