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

    this.DATE_FORMAT = 'MM-DD HH:mm';
  }

  /**
   * @return {*}
   */
  render() {
    if (this.props.task === null) {
      return (<div className={styles.summary}/>);
    }

    const beginTime = new Date(this.props.task.begin);
    const endTime = new Date(this.props.task.end);

    return (
        <div className={styles.summary}>
          <span className={styles.time}>
            <span className={styles.timeBegin}>
              {moment(beginTime).format(this.DATE_FORMAT)}
            </span>
            <span className={styles.timeSeparator}>-</span>
            <span className={styles.timeEnd}>
              {moment(endTime).format(this.DATE_FORMAT)}
            </span>
          </span>
          <span className={styles.name}>
            {this.props.task.name}
          </span>
          <span className={styles.project}>
            {this.props.task.project}
          </span>
        </div>
    );
  }
}

TaskSummary.propTypes = {
  task: PropTypes.object,
};

export {TaskSummary};
