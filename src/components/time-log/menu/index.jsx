import React, {Component} from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

import styles from './index.scss';
import logo from './logo.png';

const boundClassNames = classNames.bind(styles);

const language = 'en';
const transData = require(`./translations.${language}.yml`);

/**
 * Menu
 */
class Menu extends Component {
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
    const classNameLog = boundClassNames(
        'item', {selected: this.props.selected === 'log'});
    const classNameInsights = boundClassNames(
        'item', {selected: this.props.selected === 'insights'});
    const classNameProjects = boundClassNames(
        'item', {selected: this.props.selected === 'projects'});
    const classNameTags = boundClassNames(
        'item', {selected: this.props.selected === 'tags'});

    return (
        <div className={styles.menu}>
          <div className={styles.logo}>
            <img src={logo} />
            <span className={styles.title}>{this.props.title}</span>
          </div>
          <div className={classNameLog}>
            <FontAwesome className={styles.icon}
                         name='pencil-square-o'
                         cssModule={faStyles} />
            <span className={styles.name}>{transData.item.log}</span>
          </div>
          <div className={classNameInsights}>
            <FontAwesome className={styles.icon}
                         name='bar-chart'
                         cssModule={faStyles} />
            <span className={styles.name}>{transData.item.insights}</span>
          </div>
          <div className={classNameProjects}>
            <FontAwesome className={styles.icon}
                         name='cubes'
                         cssModule={faStyles} />
            <span className={styles.name}>{transData.item.projects}</span>
          </div>
          <div className={classNameTags}>
            <FontAwesome className={styles.icon}
                         name='tags'
                         cssModule={faStyles} />
            <span className={styles.name}>{transData.item.tags}</span>
          </div>
        </div>
    );
  }
}
Menu.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
};

export {Menu};
