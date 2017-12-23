import React, {Component} from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './index.scss';

const boundClassNames = classNames.bind(styles);

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

    const slices = [];
    for (let i = 0; i < this.props.slices.length; ++i) {
      const classNames = boundClassNames('slice', {
        used: this.props.slices[i] !== null,
      });
      slices.push(<span key={i} className={classNames} />);
    }

    return (
        <div className={styles.day}>
          <span className={styles.date}>
            <div className={styles.year}>{date.format('YYYY')}</div>
            <div className={styles.monthDay}>{date.format('MM-DD')}</div>
          </span>
          {slices}
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
