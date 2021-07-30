import React, { useState, useEffect } from 'react';
import fetchApi from '../../services/fetchApi/fetchApi';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './HomePage.module.css';
import Container from '../../components/Container/Container';

export function HomePage() {
  const { url } = useRouteMatch();
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchApi
      .fetchApiTrend()
      .then(r => {
        console.log(r);
        setFilms(r.results);
        return r;
      })
      .catch(e => console.log(e.toJSON()));
  }, []);
  return (
    <Container>
      <h1>Trending today</h1>
      <ul>
        {films[0] &&
          films.map(({ id, original_title }) => {
            if (original_title)
              return (
                <li key={id}>
                  <Link to={`${url}/${id}`} className={styles.Links}>
                    {original_title}
                  </Link>
                </li>
              );
          })}
      </ul>
    </Container>
  );
}
