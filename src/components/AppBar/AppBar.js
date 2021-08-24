import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import styles from './AppBar.module.css';
import { IntroductionTour } from 'my-test-joyride';
export function AppBar() {
  return (
    <IntroductionTour
      className={styles.Header}
      tag="header"
      title="navigationInHeader"
    >
      <Navigation />
    </IntroductionTour>
  );
}
