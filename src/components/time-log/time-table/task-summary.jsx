import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';

import styles from './task-summary.scss';

/**
 * Task summary row of the time table
 */
class TaskSummary extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.DATE_FORMAT = 'MM-DD';
    this.TIME_FORMAT = 'HH:mm';
  }

  /**
   * @return {*}
   */
  render() {
    if (this.props.task === null) {
      return (<div className={styles.summary}/>);
    }

    const beginTime = moment(new Date(this.props.task.begin));
    const endTime = moment(new Date(this.props.task.end));

    return (
        <div className={styles.summary}>
          <span className={styles.time}>
            <span className={styles.timeBegin}>
              <span className={styles.timeDate}>
                {beginTime.format(this.DATE_FORMAT)}
              </span>
              <span className={styles.timeTime}>
                {beginTime.format(this.TIME_FORMAT)}
              </span>
            </span>
            <span className={styles.timeEnd}>
              <span className={styles.timeDate}>
                {endTime.format(this.DATE_FORMAT)}
              </span>
              <span className={styles.timeTime}>
                {endTime.format(this.TIME_FORMAT)}
              </span>
            </span>
          </span>
          <span className={styles.project}>
            {this.props.task.project}
          </span>
          <span className={styles.name}>
            {this.props.task.name}
          </span>
        </div>
    );
  }
}

TaskSummary.propTypes = {
  task: PropTypes.object,
};

export {TaskSummary};
