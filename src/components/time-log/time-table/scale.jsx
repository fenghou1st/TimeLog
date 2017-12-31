import React, {Component} from 'react';

import styles from './index.scss';
import PropTypes from 'prop-types';

/**
 * Scale row of the time table
 */
class Scale extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @return {*}
   */
  render() {
    const scales = this._renderScales();

    if (this.props.position === 'bottom') {
      scales.reverse();
    }

    return (
        <table className={styles.scale}>
          <tbody>
            <tr className={styles.scaleRow}>
              <td className={styles.datePlaceholder} />
              {scales[0]}
            </tr>
            <tr className={styles.scaleRow}>
              <td className={styles.datePlaceholder} />
              {scales[1]}
            </tr>
            <tr className={styles.scaleRow}>
              <td className={styles.datePlaceholder} />
              {scales[2]}
            </tr>
          </tbody>
        </table>
    );
  }

  /**
   * Render scales
   * @return {Array}
   * @private
   */
  _renderScales() {
    /** @type {number} */
    const longScalesPerDay =
        this.props.configs.scale.longScalesPerDay;
    /** @type {number} */
    const mediumScalesPerDay = longScalesPerDay *
        this.props.configs.scale.mediumScalesPerLongScale;
    /** @type {number} */
    const shortScalesPerDay = longScalesPerDay *
        this.props.configs.scale.shortScalesPerLongScale;

    const lower = new Array(shortScalesPerDay);
    for (let i = 0; i < shortScalesPerDay; ++i) {
      lower[i] = (<td key={i}
                      className={styles.scaleElement}/>);
    }

    const middle = new Array(mediumScalesPerDay);
    for (let i = 0; i < mediumScalesPerDay; ++i) {
      middle[i] = (<td key={i} colSpan={shortScalesPerDay / mediumScalesPerDay}
                       className={styles.scaleElement}/>);
    }

    const upper = new Array(longScalesPerDay);
    for (let i = 0; i < longScalesPerDay; ++i) {
      upper[i] = (
          <td key={i} colSpan={shortScalesPerDay / longScalesPerDay}
                      className={styles.scaleElement}>
            {24 / longScalesPerDay * i}
          </td>
      );
    }

    return [upper, middle, lower];
  }
}

Scale.propTypes = {
  position: PropTypes.string.isRequired,
  configs: PropTypes.object.isRequired,
};

export {Scale};
