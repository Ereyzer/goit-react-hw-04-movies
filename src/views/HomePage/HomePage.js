import React, { useState, useEffect } from 'react';
import fetchApi from '../../services/fetchApi/fetchApi';
import styles from './HomePage.module.css';
import Container from '../../components/Container/Container';
import FilmsList from '../../components/FilmsList/FilmsList';
import IntroductionTour from '../../introductionTourFramework/App';

export default function HomePage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchApi
      .fetchApiTrend()
      .then(r => {
        setFilms(r.results);
        return r;
      })
      .catch(e => console.log(e.toJSON()));
  }, []);
  return (
    <IntroductionTour title="homePage" className="Container">
      <h1 className={styles.Title}>Trending today</h1>
      <FilmsList films={films} />
    </IntroductionTour>
  );
}
