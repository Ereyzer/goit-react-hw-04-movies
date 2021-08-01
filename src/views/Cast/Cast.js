import React, { useEffect, useState } from 'react';
import fetchApi from '../../services/fetchApi/fetchApi';
import { ActorCard } from '../../components/ActorCard/ActorCard';
import styles from './Cast.module.css';
import Loading from '../../services/helpers/Loader';
import PropTypes from 'prop-types';

export default function Cast({ movieId }) {
  const [status, setStatus] = useState('pending');
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchApi.fetchApiInfoCredits(movieId).then(r => {
      if (!r.cast[0]) {
        setStatus('rejected');
        return;
      }
      setCast(r.cast);
      setStatus('resolved');
      return r;
    });
  }, [movieId]);

  if (status === 'pending') {
    return <Loading />;
  }

  if (status === 'rejected') {
    return <p>We don't have any actors for this movie.</p>;
  }

  if (status === 'resolved')
    return (
      <ul className={styles.List}>
        {cast.map(({ profile_path, character, id, name }) => {
          if (id === 118236) {
            return null;
          }

          return (
            <ActorCard
              profile_path={profile_path}
              character={character}
              key={id}
              name={name}
              className={styles.Item}
            />
          );
        })}
      </ul>
    );
}

Cast.propTypes = {
  movieId: PropTypes.number.isRequired,
};
