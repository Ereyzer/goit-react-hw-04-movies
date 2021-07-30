import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import styles from './AppBar.module.css';
export function AppBar() {
  return (
    <header className={styles.Header}>
      <Navigation />
    </header>
  );
}
