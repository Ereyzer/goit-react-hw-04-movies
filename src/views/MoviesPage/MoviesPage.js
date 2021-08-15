import React, { useState, useEffect } from 'react';
import { SearchFilms } from '../../components/SearchFilms/SearchFilms';
import Container from '../../components/Container/Container';
import fetchApi from '../../services/fetchApi/fetchApi';
import FilmsList from '../../components/FilmsList/FilmsList';

import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router';

export default function MoviesPage() {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(() => {
    const searchParams = new URLSearchParams(location.search).get('query');
    return searchParams ? searchParams : '';
  });
  const [films, setFilms] = useState([]);

  const history = useHistory();

  const onSubmit = value => {
    setSearchValue(value);
    console.log('submit');
    history.push({
      ...location,
      search: `query=${value}`,
    });
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
