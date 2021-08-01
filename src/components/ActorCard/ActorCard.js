import React from 'react';
import PropTypes from 'prop-types';

export function ActorCard({ profile_path, character, id, name, className }) {
  console.log(profile_path);
  return (
    <li className={className}>
      <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt={id} />
      <h3>{name}</h3>
      <p>character: {character}</p>
    </li>
  );
}

ActorCard.defaultProps = {
  name: 'igor',
  character: 'stupid',
  profile_path: '/elyNvdqbWo2v2teDKFQ3jpoapU0.jpg',
};
ActorCard.propTypes = {
  profile_path: PropTypes.string,
  name: PropTypes.string,
  character: PropTypes.string,
};
