import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import {createSelectable} from 'react-selectable-fast';

import styles from './index.scss';

const boundClassNames = classNames.bind(styles);

const Slice = ({selectableRef, selected, selecting, used}) => (
    <span ref={selectableRef}
          className={boundClassNames('slice', {
            selected: selected,
            selecting: selecting,
            used: used,
          })}
    />
);
Slice.propTypes = {
  selectableRef: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  selecting: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
  used: PropTypes.bool.isRequired,
};

export default createSelectable(Slice);
