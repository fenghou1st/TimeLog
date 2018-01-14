import React, {Component} from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

import {loadConfig} from 'src/base/js/config';
import styles from './index.scss';
import logo from './logo.png';

const boundClassNames = classNames.bind(styles);

const language = loadConfig().language;
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

    this.ITEM_LOG = 'log';
    this.ITEM_INSIGHTS = 'insights';
    this.ITEM_PROJECTS = 'projects';
    this.ITEM_TAGS = 'tags';
  }

  /**
   * @return {*}
   */
  render() {
    const classNameMenu = boundClassNames(
        'menu', {compact: this.props.data.isCompact});
    const classNameLog = boundClassNames(
        'item', {selected: this.props.data.selected === this.ITEM_LOG});
    const classNameInsights = boundClassNames(
        'item', {selected: this.props.data.selected === this.ITEM_INSIGHTS});
    const classNameProjects = boundClassNames(
        'item', {selected: this.props.data.selected === this.ITEM_PROJECTS});
    const classNameTags = boundClassNames(
        'item', {selected: this.props.data.selected === this.ITEM_TAGS});

    return (
        <div className={classNameMenu}>
          <div className={styles.logo}>
            <img src={logo}
                 onClick={() => this.onClickLogo()}
            />
            {
              !this.props.data.isCompact &&
              <span className={styles.title}>{this.props.title}</span>
            }
          </div>
          <div className={classNameLog}
               onClick={() => this.onClickItem(this.ITEM_LOG)}
          >
            <FontAwesome className={styles.icon}
                         name='pencil-square-o'
                         cssModule={faStyles}
            />
            {
              !this.props.data.isCompact &&
              <span className={styles.name}>{transData.item.log}</span>
            }
          </div>
          <div className={classNameInsights}
               onClick={() => this.onClickItem(this.ITEM_INSIGHTS)}
          >
            <FontAwesome className={styles.icon}
                         name='bar-chart'
                         cssModule={faStyles}
            />
            {
              !this.props.data.isCompact &&
              <span className={styles.name}>{transData.item.insights}</span>
            }
          </div>
          <div className={classNameProjects}
               onClick={() => this.onClickItem(this.ITEM_PROJECTS)}
          >
            <FontAwesome className={styles.icon}
                         name='cubes'
                         cssModule={faStyles}
            />
            {
              !this.props.data.isCompact &&
              <span className={styles.name}>{transData.item.projects}</span>
            }
          </div>
          <div className={classNameTags}
               onClick={() => this.onClickItem(this.ITEM_TAGS)}
          >
            <FontAwesome className={styles.icon}
                         name='tags'
                         cssModule={faStyles}
            />
            {
              !this.props.data.isCompact &&
              <span className={styles.name}>{transData.item.tags}</span>
            }
          </div>
        </div>
    );
  }

  /**
   * On click logo
   */
  onClickLogo() {
    this.props.onEditCompact();
  }

  /**
   * On click menu item
   * @param {string} item
   */
  onClickItem(item) {
    this.props.onSelectItem(item);
  }
}

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onEditCompact: PropTypes.func.isRequired,
};

export {Menu};
