import React, {Component} from 'react';

import styles from './index.scss';

// const language = 'en';
// const transData = require(`./translations.${language}.yml`);

/**
 * Time manager
 */
class TimeManager extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <div className={styles.days}>
          <div className={styles.scale}>
          </div>
          <div className={styles.day}>
            <span className={[styles.slice, styles.used].join(' ')}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
          </div>
          <div className={styles.day}>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
          </div>
          <div className={styles.day}>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
            <span className={styles.slice}></span>
          </div>
        </div>
    );
  }
}

export {TimeManager};
