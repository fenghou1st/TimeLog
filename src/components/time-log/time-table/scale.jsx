import React, {Component} from 'react';

import styles from './index.scss';

/**
 * Scale row of the time table
 */
class Scale extends Component {
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
        <div className={styles.scale}>
        </div>
    );
  }
}

export {Scale};
