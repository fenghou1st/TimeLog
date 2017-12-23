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
      menu: {selected: 'log'},
    };
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <div className={styles.frame}>
          <Menu title={this.props.title} selected={this.state.menu.selected} />
          <div className={styles.content}>
            <TimeTable />
          </div>
        </div>
    );
  }
}
TimeLog.propTypes = {
  title: PropTypes.string.isRequired,
};

export {TimeLog};
