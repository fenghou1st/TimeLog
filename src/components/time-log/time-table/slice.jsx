import React, {Component} from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import {createSelectable} from 'react-selectable-fast';

import styles from './slice.scss';

const boundClassNames = classNames.bind(styles);

/**
 * Content element of the time table
 */
class Slice extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <span ref={this.props.selectableRef}
              className={boundClassNames('slice', {
                selected: this.props.selected,
                selecting: this.props.selecting,
                ['not-selectable']: this.props.taskId !== null,
                [`task${this.props.styleId}`]: this.props.styleId !== null,
              })}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
        />
    );
  }

  /**
   * On mouse enter
   */
  onMouseEnter() {
    this.props.onSliceEnter(this.props.begin, this.props.taskId);
  }

  /**
   * On mouse leave
   */
  onMouseLeave() {
    this.props.onSliceLeave(this.props.begin, this.props.taskId);
  }
}

Slice.propTypes = {
  selectableRef: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  selecting: PropTypes.bool.isRequired,
  begin: PropTypes.number.isRequired,
  taskId: PropTypes.number,
  styleId: PropTypes.number,
  onSliceEnter: PropTypes.func.isRequired,
  onSliceLeave: PropTypes.func.isRequired,
};

export default createSelectable(Slice);
