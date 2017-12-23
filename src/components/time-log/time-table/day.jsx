import React, {Component} from 'react';

import styles from './index.scss';

/**
 * Content row of the time table
 */
class Day extends Component {
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
        <div className={styles.table}>
        </div>
    );
  }
}

export {Day};
