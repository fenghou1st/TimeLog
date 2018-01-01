import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Slice from './slice.jsx';
import styles from './day.scss';

/**
 * Content row of the time table
 */
class Day extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseEnterDate = this.onMouseEnterDate.bind(this);
  }

  /**
   * @return {*}
   */
  render() {
    const date = moment(this.props.date);

    return (
        <div className={styles.day}
             onMouseEnter={this.onMouseEnter}
             onMouseLeave={this.onMouseLeave}
        >
          <span className={styles.date}
                onMouseEnter={this.onMouseEnterDate}
          >
            <div className={styles.year}>{date.format('YYYY')}</div>
            <div className={styles.monthDay}>{date.format('MM-DD')}</div>
          </span>
          {this.props.slices.map(({taskId, styleId}, i) => (
              <Slice key={i}
                     date={this.props.date}
                     id={i}
                     taskId={taskId}
                     styleId={styleId}
                     onSliceHover={this.props.onSliceHover}
              />
          ))}
        </div>
    );
  }

  /**
   * On mouse enter
   */
  onMouseEnter() {
    this.props.onDayHover(this.props.date);
  }

  /**
   * On mouse leave
   */
  onMouseLeave() {
    this.props.onDayHover(null);
  }

  /**
   * On mouse enter date component
   */
  onMouseEnterDate() {
    this.props.onSliceHover(this.props.date, null, null);
  }
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date),
  begin: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  slices: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDayHover: PropTypes.func.isRequired,
  onSliceHover: PropTypes.func.isRequired,
};

export {Day};
