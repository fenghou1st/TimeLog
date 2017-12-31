import React, {Component} from 'react';
import {SelectableGroup} from 'react-selectable-fast';

import {loadConfig} from 'src/base/js/config';
import {Body} from './body.jsx';
import {Scale} from './scale.jsx';
import styles from './index.scss';

// const language = 'en';
// const transData = require(`./translations.${language}.yml`);

/**
 * Time table
 */
class TimeTable extends Component {
  /**
   * TODO: get tasks from remote server
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          begin: 1513863200000, // 2017-12-21 21:33 +0800
          end: 1513864200000, // 2017-12-21 21:50 +0800
          name: 'test task 001',
          project: 'test project 001',
          tags: ['test tag 001', 'test tag 002', 'test tag 003'],
        },
        {
          begin: 1513949600000, // 2017-12-22 21:33 +0800
          end: 1513950600000, // 2017-12-22 21:50 +0800
          name: 'test task 002',
          project: 'test project 001',
          tags: ['test tag 002', 'test tag 003', 'test tag 004'],
        },
        {
          begin: 1514036000000, // 2017-12-23 21:33:20 +0800
          end: 1514037000000, // 2017-12-23 21:50:00 +0800
          name: 'test task 003',
          project: 'test project 002',
          tags: ['test tag 003', 'test tag 004', 'test tag 005'],
        },
      ],
    };

    /** @type {Object} */
    this.configs = loadConfig().timeLog.timeTable;

    this.onSelectionFinish = this.onSelectionFinish.bind(this);
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <SelectableGroup
            className={styles.table}
            enableDeselect
            onSelectionFinish={this.onSelectionFinish}
            ignoreList={['.not-selectable']}
        >
          <Scale position='top' configs={this.configs}/>
          <Body tasks={this.state.tasks} configs={this.configs}/>
          <Scale position='bottom' configs={this.configs}/>
        </SelectableGroup>
    );
  }

  /**
   * @param {Array.<SelectableItem>} selectedItems
   */
  onSelectionFinish(selectedItems) {
    // TODO: get date & time
    console.log(selectedItems);
    // TODO: log duration

    // TODO: 显示所选时间段，并出现一行文本框，提示填写任务名，填写任务名之后继续显示其他填写项
  }
}

export {TimeTable};
