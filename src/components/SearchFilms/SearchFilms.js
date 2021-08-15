import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

export function SearchFilms({ onSubmit }) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(() => {
    const searchParams = new URLSearchParams(location.search).get('query');
    return searchParams ? searchParams : '';
  });
  const handleSubmit = e => {
    e.preventDefault();
    const value = searchValue.trim();
    if (value === '') {
      toast.warn('the input field is empty');
      return;
    }
    onSubmit(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      ></input>
      <button type="submit">Search</button>
    </form>
  );
}

SearchFilms.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
