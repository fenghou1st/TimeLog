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
   * TODO: get tasks from remote server
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          begin: 1513863200000, // 2017-12-21 21:33 +0800
          end: 1513864200000, // 2017-12-21 21:50 +0800
          name: 'test task 001',
          project: 'test project 001',
          tags: ['test tag 001', 'test tag 002', 'test tag 003'],
        },
        {
          begin: 1513949600000, // 2017-12-22 21:33 +0800
          end: 1513950600000, // 2017-12-22 21:50 +0800
          name: 'test task 002',
          project: 'test project 001',
          tags: ['test tag 002', 'test tag 003', 'test tag 004'],
        },
        {
          begin: 1514036000000, // 2017-12-23 21:33:20 +0800
          end: 1514037000000, // 2017-12-23 21:50:00 +0800
          name: 'test task 003',
          project: 'test project 002',
          tags: ['test tag 003', 'test tag 004', 'test tag 005'],
        },
      ],
    };
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <div className={styles.table}>
          <Scale />
          <Body tasks={this.state.tasks} />
          <Scale />
        </div>
    );
  }
}

export {TimeTable};
