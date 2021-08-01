import React, { useState, useEffect } from 'react';
import fetchApi from '../../services/fetchApi/fetchApi';
import Loading from '../../services/helpers/Loader';
import PropTypes from 'prop-types';

export default function Reviews({ movieId }) {
  const [status, setStatus] = useState('pending');
  const [review, setReview] = useState(null);

  useEffect(() => {
    fetchApi.fetchApiReview(movieId).then(r => {
      if (!r.results[0]) {
        setStatus('rejected');
        return;
      }
      setReview(r.results);
      setStatus('resolved');
      return r;
    });
  }, [movieId]);

  if (status === 'pending') {
    return <Loading />;
  }

  if (status === 'rejected') {
    return <p>We don't have any reviews for this movie.</p>;
  }

  if (status === 'resolved') {
    return (
      <ul>
        {review.map(({ author, content, created_at, id }) => (
          <li key={id}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
            <p>Created at: {created_at}</p>
          </li>
        ))}
      </ul>
    );
  }
}

Reviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};
