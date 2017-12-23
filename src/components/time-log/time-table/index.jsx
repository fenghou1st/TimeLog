import React, {Component} from 'react';

import {Body} from './body.jsx';
import {Scale} from './scale.jsx';

import styles from './index.scss';

// const language = 'en';
// const transData = require(`./translations.${language}.yml`);

/**
 * Time table
 */
class TimeTable extends Component {
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
          <Scale />
          <Body />
          <Scale />
        </div>
    );
  }
}

export {TimeTable};
