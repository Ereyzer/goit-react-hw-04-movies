import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from '../FilmsList/FilmList.module.css';

export function FilmItem({ id, original_title, url }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get('query');

  return (
    <li>
      <Link
        to={{
          pathname: `/movies/${id}`,
          state: { from: url, search: searchParams },
        }}
        className={styles.Links}
      >
        {original_title}
      </Link>
    </li>
  );
}

FilmItem.defaultProps = {
  original_title: 'no Name',
};

FilmItem.propTypes = {
  id: PropTypes.number.isRequired,
  original_title: PropTypes.string,
};
