import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Slice from './slice.jsx';
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
    const date = moment(this.props.date);

    return (
        <div className={styles.day}>
          <span className={styles.date}>
            <div className={styles.year}>{date.format('YYYY')}</div>
            <div className={styles.monthDay}>{date.format('MM-DD')}</div>
          </span>
          {this.props.slices.map((taskId, i) => (
              <Slice key={i}
                     date={this.props.date}
                     id={i}
                     used={taskId !== null}/>
          ))}
        </div>
    );
  }
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date),
  begin: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  slices: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export {Day};
