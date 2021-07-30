import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
export function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={styles.Link}
        activeClassName={styles.CurrentLink}
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/movies"
        className={styles.Link}
        activeClassName={styles.CurrentLink}
      >
        Movies
      </NavLink>
    </nav>
  );
}
