import styles from './COntainer.module.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function Container({ children }) {
  return <div className={styles.Container}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
};
