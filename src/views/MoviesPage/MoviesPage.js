import React, { useState, useEffect } from 'react';
import { SearchFilms } from '../../components/SearchFilms/SearchFilms';
import Container from '../../components/Container/Container';
import fetchApi from '../../services/fetchApi/fetchApi';
import FilmsList from '../../components/FilmsList/FilmsList';

import { toast } from 'react-toastify';

export default function MoviesPage() {
  const [searchValue, setSearchValue] = useState('');
  const [films, setFilms] = useState([]);

  const onSubmit = value => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue === '') return;
    fetchApi
      .fetchApiSearch(searchValue)
      .then(r => {
        if (r.total_results === 0)
          throw Error(`no exist any films with ${searchValue}`);
        setFilms(r.results);
        return r;
      })
      .then(console.log)
      .catch(e => {
        toast.error(e.message);
      });
  }, [searchValue]);

  return (
    <div>
      <Container>
        <SearchFilms onSubmit={onSubmit} />
      </Container>
      <Container>
        <FilmsList films={films} />
      </Container>
    </div>
  );
}
