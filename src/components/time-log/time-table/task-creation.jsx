import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import ReactTooltip from 'react-tooltip';

import styles from './task-creation.scss';

/**
 * Task creation row of the time table
 */
class TaskCreation extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      name: null,
    };

    this.DATE_FORMAT = 'MM-DD';
    this.TIME_FORMAT = 'HH:mm';

    this.onChangeName = this.onChangeName.bind(this);
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <div className={styles.creation}>
          {this._renderPeriods()}
          <input className={styles.name}
                 type='text'
                 value={this.props.data.name}
                 onChange={this.onChangeName}
          />
        </div>
    );
  }

  // /**
  //  * TODO: remove
  //  * Test only
  //  */
  // componentDidUpdate() {
  //   console.info('Time-table\'s task-creation re-rendered');
  // }

  /**
   * @return {Array}
   * @private
   */
  _renderPeriods() {
    const MAX_SHOWN_PERIODS = 3;

    const periods = this.props.data.periods;
    const numShownPeriods = Math.min(periods.length, MAX_SHOWN_PERIODS);

    const periodComponents = [];
    for (let i = 0; i < numShownPeriods; ++i) {
      const period = periods[i];
      const beginTime = moment(period.begin);
      const endTime = moment(period.end);
      periodComponents.push(
          <span key={period.begin} className={styles.period}>
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
      );
    }

    if (periods.length > numShownPeriods) {
      periodComponents.push(
          <span key='ellipsis'
                className={styles.ellipsis}
                data-tip={`Total ${periods.length} periods`}
          >
            ...
          </span>
      );
      periodComponents.push(<ReactTooltip key='tooltip' effect='solid'/>);
    }

    return periodComponents;
  }

  /**
   * @param {Event} event
   */
  onChangeName(event) {
    console.log(`Old name: ${this.state.name}`);
    this.setState({name: event.target.value});
    console.log(`New name: ${event.target.value}`);
  }
}

TaskCreation.propTypes = {
  data: PropTypes.object.isRequired,
};

export {TaskCreation};
