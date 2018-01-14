import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {Menu} from './menu/index.jsx';
import {TimeTable} from './time-table/index.jsx';

import styles from './index.scss';

/**
 * Time log
 */
class TimeLog extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        selected: 'log',
        isCompact: false,
        isCompactEdited: false,
      },
      timeTable: {
        shouldUpdateDimensions: false,
      },
    };

    this.COMPACT_MODE_WIDTH_THRESHOLD = 1024;

    this._updateDimensions = this._updateDimensions.bind(this);
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <div className={styles.frame}>
          <Menu title={this.props.title}
                data={this.state.menu}
                onSelectItem={this.onSelectItem.bind(this)}
                onEditCompact={() => this.onEditCompact()}
          />
          <div className={styles.content}>
            <TimeTable
                shouldUpdateDimensions={
                  this.state.timeTable.shouldUpdateDimensions}
                dimensionsUpdated={
                  () => this.timeTableDimensionsUpdated()}
            />
          </div>
        </div>
    );
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this._updateDimensions();
    window.addEventListener('resize', this._updateDimensions);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateDimensions);
  }

  /**
   * On select menu item
   * @param {string} item
   */
  onSelectItem(item) {
    this.setState((prevState, props) => ({
      menu: {
        selected: item,
        isCompact: prevState.menu.isCompact,
        isCompactEdited: prevState.menu.isCompactEdited,
      },
    }));
  }

  /**
   * On edit compact status
   */
  onEditCompact() {
    this.setState((prevState, props) => ({
      menu: {
        selected: prevState.menu.selected,
        isCompact: !prevState.menu.isCompact,
        isCompactEdited: true,
      },
      timeTable: {
        shouldUpdateDimensions: true,
      },
    }));
  }

  /**
   * Time-table's dimensions updated
   */
  timeTableDimensionsUpdated() {
    this.setState({
      timeTable: {
        shouldUpdateDimensions: false,
      },
    });
  }

  /**
   * Update dimensions
   * @private
   */
  _updateDimensions() {
    const isCompact = window.innerWidth < this.COMPACT_MODE_WIDTH_THRESHOLD;

    if (isCompact !== this.state.menu.isCompact &&
        !this.state.menu.isCompactEdited) {
      this.setState((prevState, props) => ({
        menu: {
          selected: prevState.menu.selected,
          isCompact: isCompact,
          isCompactEdited: prevState.menu.isCompactEdited,
        },
        timeTable: {
          shouldUpdateDimensions: true,
        },
      }));
    }
  }
}

TimeLog.propTypes = {
  title: PropTypes.string.isRequired,
};

export {TimeLog};
