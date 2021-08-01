import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { FilmItem } from '../FilmItem/FilmItem';

export default function FilmsList({ films }) {
  const { url } = useRouteMatch();
  return (
    <ul>
      {films[0] &&
        films.map(({ id, original_title }) => {
          return (
            <FilmItem
              key={id}
              id={id}
              original_title={original_title}
              url={url}
            />
          );
        })}
    </ul>
  );
}

FilmsList.propTypes = {
  films: PropTypes.array.isRequired,
};
