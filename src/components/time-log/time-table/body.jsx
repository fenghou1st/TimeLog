import React, {Component} from 'react';

import {Day} from './day.jsx';

import styles from './index.scss';

/**
 * Body of the time table
 */
class Body extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      days: [
        {date: '2017-12-17'},
        {date: '2017-12-18'},
        {date: '2017-12-19'},
        {date: '2017-12-20'},
        {date: '2017-12-21'},
        {date: '2017-12-22'},
        {date: '2017-12-23'},
      ],
    };
  }

  /**
   * @return {*}
   */
  render() {
    const days = this.state.days.map((day) =>
      <Day props={day} key={day.date} />
    );

    return (
        <div className={styles.body}>
          {days}
        </div>
    );
  }
}

export {Body};
