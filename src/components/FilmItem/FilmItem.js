import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../FilmsList/FilmList.module.css';

export function FilmItem({ id, original_title, url }) {
  return (
    <li>
      <Link
        to={{
          pathname: `/movies/${id}`,
          state: { from: url },
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
