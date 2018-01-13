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

    this.onClick = this.onClick.bind(this);
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
                highlighted: this.props.highlighted,
                ['not-selectable']: this.props.taskId !== null,
                [`task${this.props.styleId}`]: this.props.styleId !== null,
              })}
              onClick={this.onClick}
        />
    );
  }

  // /**
  //  * TODO: remove
  //  * Test only
  //  */
  // componentDidUpdate() {
  //   console.info(`Time-table's slice re-rendered: ${this.props.begin}`);
  // }

  /**
   * On mouse click (on unselectable slices)
   */
  onClick() {
    this.props.onSelectUsedSlice(this.props.taskId, this.props.begin);
  }
}

Slice.propTypes = {
  selectableRef: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  selecting: PropTypes.bool.isRequired,
  begin: PropTypes.number.isRequired,
  taskId: PropTypes.number,
  styleId: PropTypes.number,
  highlighted: PropTypes.bool.isRequired,
  onSelectUsedSlice: PropTypes.func.isRequired,
};

export default createSelectable(Slice);
