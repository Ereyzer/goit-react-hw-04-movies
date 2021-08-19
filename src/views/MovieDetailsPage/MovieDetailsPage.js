import React, { useState, useEffect, lazy } from 'react';
import Button from '@material-ui/core/Button';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {
  NavLink,
  useRouteMatch,
  useParams,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import Container from '../../components/Container/Container';
import fetchApi from '../../services/fetchApi/fetchApi';
import styles from './MovieDetailsPage.module.css';
import IntroductionTour from '../../introductionTourFramework/App';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "home-view" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "home-view" */),
);

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const [film, setFilm] = useState(null);
  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    fetchApi.fetchApiInfo(movieId).then(r => {
      setFilm(r);
      return r;
    });
  }, [movieId]);

  const onGoBack = () =>
    history.push(
      `${location?.state?.from ?? '/'}${
        location?.state?.search ? `?query=${location?.state?.search}` : ''
      }`,
    );
  // console.log('history', history);
  return (
    <IntroductionTour title="movieDetailPage" className="Container">
      <Button
        type="button"
        variant="contained"
        size="large"
        color="primary"
        className={styles.Button}
        onClick={onGoBack}
      >
        <AiOutlineArrowLeft /> GO Back
      </Button>
      {film && (
        <div className={styles.Card}>
          <div className={styles.InCard}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                alt={film.original_title}
              />
            </div>
            <div className={styles.AboutFilm}>
              <h1>{film.original_title}</h1>
              <p>User Score: {film.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{film.overview}</p>
              <h3>Genres</h3>
              <ul className={styles.Genres}>
                {film.genres.map(g => (
                  <li key={g.id}>{g.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.Information}>
            <h3>Additional information</h3>
            <NavLink
              to={{
                pathname: `${url}/cast`,
                state: {
                  from: location?.state?.from ?? '/',
                  search: location?.state?.search,
                },
              }}
              className={styles.Link}
            >
              Cast
            </NavLink>
            <NavLink
              to={{
                pathname: `${url}/reviews`,
                state: {
                  from: location?.state?.from ?? '/',
                  search: location?.state?.search,
                },
              }}
              className={styles.Link}
            >
              Reviews
            </NavLink>
          </div>
        </div>
      )}

      <div>
        <Switch>
          <Route path={`${path}/cast`}>
            <Cast movieId={movieId} />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </div>
    </IntroductionTour>
  );
}
