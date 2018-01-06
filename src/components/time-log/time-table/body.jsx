import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Slice from './slice.jsx';
import styles from './body.scss';

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
      tasks: this.props.tasks,
    };
  }

  /**
   * @return {*}
   */
  render() {
    const {dates, slices} = this._getDatesAndSlices(this.state.tasks);

    const dateComponents = dates.map((date) => {
      const day = moment(date);
      return (
          <div key={date.valueOf()} className={styles.date}>
            <div className={styles.year}>{day.format('YYYY')}</div>
            <div className={styles.monthDay}>{day.format('MM-DD')}</div>
          </div>
      );
    });

    const sliceComponents = slices.map(({begin, taskId, styleId}) => (
        <Slice key={begin}
               begin={begin}
               taskId={taskId}
               styleId={styleId}
               onSliceEnter={this.props.onSliceEnter}
               onSliceLeave={this.props.onSliceLeave}
        />
    ));

    const slicesStyles = {
      gridTemplateColumns:
          `repeat(${this.props.numSlicesPerDay}, ${this.props.sliceWidth}px)`,
      gridColumnGap: this.props.sliceGapH,
    };

    return (
        <div className={styles.body}>
          <div className={styles.dates} ref={this.props.datesRef}>
            {dateComponents}
          </div>
          <div className={styles.slices} style={slicesStyles}>
            {sliceComponents}
          </div>
        </div>
    );
  }

  /**
   * TODO: implement
   * Get day list and each day's slices
   * @param {Array.<Object>} tasks
   * @return {{dates: Array.<Date>, slices: Array.<Object>}}
   * @private
   */
  _getDatesAndSlices(tasks) {
    const NUM_SHOW_DAYS = 7;
    const HOURS_PER_DAY = 24;

    // Generate dates
    const now = new Date();
    const globalBegin = new Date(now.valueOf());
    globalBegin.setHours(0, 0, 0, 0);
    globalBegin.setDate(globalBegin.getDate() - NUM_SHOW_DAYS);

    const dates = new Array(NUM_SHOW_DAYS);
    for (let i = 0; i < NUM_SHOW_DAYS; ++i) {
      const currDate = new Date(globalBegin.valueOf());
      currDate.setDate(currDate.getDate() + i);
      dates[i] = currDate;
    }

    // Mock tasks
    const taskLoopSteps = 120;
    const mockedTasks = new Array(taskLoopSteps);
    for (let i = 0; i < 24; ++i) {
      mockedTasks[i] = {taskId: 0, styleId: 0};
    }
    for (let i = 24; i < 54; ++i) {
      mockedTasks[i] = {taskId: 1, styleId: 7};
    }
    for (let i = 54; i < 84; ++i) {
      mockedTasks[i] = {taskId: 2, styleId: 14};
    }
    for (let i = 84; i < 120; ++i) {
      mockedTasks[i] = {taskId: null, styleId: null};
    }

    // Generate slices
    /** @type {number} */
    const slicesPerHour = this.props.configs.slice.slicesPerHour;
    const slicesPerDay = slicesPerHour * HOURS_PER_DAY;

    const todayBegin = new Date(now.valueOf());
    todayBegin.setHours(0, 0, 0, 0);
    const elapsed = now.valueOf() - todayBegin.valueOf();
    const sliceDuration = 60 * 60 * 1000 / slicesPerHour;
    const numSlicesToday = Math.ceil(elapsed / sliceDuration);
    const numSlicesTotal = slicesPerDay * (NUM_SHOW_DAYS - 1) + numSlicesToday;

    const slices = new Array(numSlicesTotal);
    for (let i = 0; i < numSlicesTotal; ++i) {
      const currTask = mockedTasks[i % taskLoopSteps];
      const currBegin = globalBegin.valueOf() + sliceDuration * i;
      slices[i] = {
        begin: currBegin,
        taskId: currTask.taskId,
        styleId: currTask.styleId,
      };
    }

    return {dates, slices};
  }
}

Body.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    begin: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  configs: PropTypes.object.isRequired,
  sliceWidth: PropTypes.number.isRequired,
  sliceGapH: PropTypes.number.isRequired,
  numSlicesPerDay: PropTypes.number.isRequired,
  onSliceEnter: PropTypes.func.isRequired,
  onSliceLeave: PropTypes.func.isRequired,
  datesRef: PropTypes.func.isRequired,
};

export {Body};
