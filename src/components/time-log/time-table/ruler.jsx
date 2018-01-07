import React, {Component} from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ruler.scss';

const boundClassNames = classNames.bind(styles);

/**
 * Ruler row of the time table
 */
class Ruler extends Component {
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

    return (
        <div className={boundClassNames('ruler', this.props.position)}>
          <span className={styles.datePlaceholder}/>
          {scales}
        </div>
    );
  }

  // /**
  //  * TODO: remove
  //  * Test only
  //  */
  // componentDidUpdate() {
  //   console.info('Time-table\'s ruler re-rendered');
  // }

  /**
   * Render scales
   * @return {Array}
   * @private
   */
  _renderScales() {
    const HOURS_PER_DAY = 24;

    /** @type {number} */
    const numLongScales =
        this.props.configs.scale.longScalesPerDay;
    /** @type {number} */
    const numMediumScales = numLongScales *
        this.props.configs.scale.mediumScalesPerLongScale;
    /** @type {number} */
    const numShortScales = numLongScales *
        this.props.configs.scale.shortScalesPerLongScale;

    const longScaleInterval = numShortScales / numLongScales;
    const mediumScalesInterval = numShortScales / numMediumScales;

    const scales = new Array(numShortScales);
    for (let i = 0; i < numShortScales; ++i) {
      if (i % longScaleInterval === 0) {
        scales[i] = (
            <span key={i}
                  className={boundClassNames('scale', 'long')}
                  style={{marginRight: this.props.scaleWidth}}
            >
              <span className={styles.text}>
                {i / numShortScales * HOURS_PER_DAY}
              </span>
            </span>
        );
      } else if (i % mediumScalesInterval === 0) {
        scales[i] = (
            <span key={i}
                  className={boundClassNames('scale', 'medium')}
                  style={{marginRight: this.props.scaleWidth}}
            />
        );
      } else {
        scales[i] = (
            <span key={i}
                  className={styles.scale}
                  style={{marginRight: this.props.scaleWidth}}
            />
        );
      }
    }

    return scales;
  }
}

Ruler.propTypes = {
  position: PropTypes.string.isRequired,
  configs: PropTypes.object.isRequired,
  scaleWidth: PropTypes.number.isRequired,
};

export {Ruler};
