import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
      tasks: this.props.tasks,
    };

    /** @type {Array.<Object>} */
    this.dayList = null;
  }

  /**
   * @return {*}
   */
  render() {
    this.dayList = this._getDayList(this.state.tasks);

    const days = this.dayList.map((day) =>
        <Day key={day.date}
             date={day.date}
             begin={day.begin}
             end={day.end}
             slices={day.slices}/>,
    );

    return (
        <div className={styles.body}>
          {days}
        </div>
    );
  }

  /**
   * TODO: implement
   * Get day list and each day's slice-task map
   * @param {Array.<Object>} tasks
   * @return {Array.<Object>}
   * @private
   */
  _getDayList(tasks) {
    /** @type {number} */
    const slicesPerHour = this.props.configs.slice.slicesPerHour;
    const slicesPerDay = slicesPerHour * 24;
    const slices = new Array(slicesPerDay);
    for (let i = 0; i < slicesPerDay; ++i) {
      const taskId = i % slicesPerDay < 21 ? i : null;
      const styleId = taskId !== null ? taskId % 21 : null;
      slices[i] = {taskId, styleId};
    }

    return [
      {
        date: new Date(1513785600000),
        begin: 1513785600000,
        end: 1513872000000,
        slices: slices,
      },
      {
        date: new Date(1513872000000),
        begin: 1513872000000,
        end: 1513958400000,
        slices: slices,
      },
      {
        date: new Date(1513958400000),
        begin: 1513958400000,
        end: 1514044800000,
        slices: slices,
      },
    ];
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
};

export {Body};
