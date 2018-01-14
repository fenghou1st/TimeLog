import React, {Component} from 'react';

// import {loadConfig} from 'src/base/js/config';
import styles from './index.scss';

// const language = loadConfig().language;
// const transData = require(`./translations.${language}.yml`);

/**
 * Project manager
 */
class ProjectManager extends Component {
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
        <div className={styles.manager}>
          Project manager
        </div>
    );
  }
}

export {ProjectManager};
