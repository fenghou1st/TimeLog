import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import {createSelectable} from 'react-selectable-fast';

import styles from './index.scss';

const boundClassNames = classNames.bind(styles);

const Slice = ({selectableRef, selected, selecting, taskId, styleId}) => (
    <span ref={selectableRef}
          className={boundClassNames('slice', {
            selected: selected,
            selecting: selecting,
            ['not-selectable']: taskId !== null,
            [`task${styleId}`]: styleId !== null,
          })}
    />
);
Slice.propTypes = {
  selectableRef: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  selecting: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
  taskId: PropTypes.number,
  styleId: PropTypes.number,
};

export default createSelectable(Slice);
