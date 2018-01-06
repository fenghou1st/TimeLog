import React, {Component} from 'react';
import {SelectableGroup} from 'react-selectable-fast';

import {loadConfig} from 'src/base/js/config';
import {Body} from './body.jsx';
import {Ruler} from './ruler.jsx';
import {TaskSummary} from './task-summary.jsx';
import styles from './index.scss';

// const language = 'en';
// const transData = require(`./translations.${language}.yml`);

/**
 * Time table
 * TODO: translate comments
 * 为了视觉上的舒适度，需要通过窗口宽度计算 slice 的宽度，从而保证 slice 的宽度为整数。
 */
class TimeTable extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      tasks: this.getTasks(),
      dimensions: {
        tableWidth: 800,
        sliceWidth: 4,
        sliceGapH: 1,
      },
      hoveredTask: null,
    };

    /** @type {Object} */
    this.configs = loadConfig().timeLog.timeTable;

    this.numSlicesPerDay = this._getNumSlicesPerDay();

    /** @type {Element} */
    this.rootNode = null;
    /** @type {Element} */
    this.datesNode = null;

    /** @type {{begin: ?number, taskId: ?number, timeoutID: ?number}} */
    this.hovered = {
      begin: null,
      taskId: null,
      timeoutID: null,
    };

    this._updateDimensions = this._updateDimensions.bind(this);
    this.onSelectionFinish = this.onSelectionFinish.bind(this);
    this.onSliceEnter = this.onSliceEnter.bind(this);
    this.onSliceLeave = this.onSliceLeave.bind(this);
  }

  /**
   * @return {*}
   */
  render() {
    const scaleWidth = this.state.dimensions.sliceWidth +
        this.state.dimensions.sliceGapH;

    return (
        <SelectableGroup
            className={styles.table}
            style={{width: this.state.dimensions.tableWidth}}
            ref={(el) => this.rootNode = el !== null ? el.rootNode : null}
            enableDeselect
            onSelectionFinish={this.onSelectionFinish}
            ignoreList={['.not-selectable']}
        >
          <Ruler position='top'
                 configs={this.configs}
                 scaleWidth={scaleWidth}
          />
          <Body tasks={this.state.tasks}
                configs={this.configs}
                sliceWidth={this.state.dimensions.sliceWidth}
                sliceGapH={this.state.dimensions.sliceGapH}
                numSlicesPerDay={this.numSlicesPerDay}
                onSliceEnter={this.onSliceEnter}
                onSliceLeave={this.onSliceLeave}
                datesRef={(el) => this.datesNode = el}
          />
          <Ruler position='bottom'
                 configs={this.configs}
                 scaleWidth={scaleWidth}
          />
          <TaskSummary task={this.state.hoveredTask}/>
        </SelectableGroup>
    );
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this._updateDimensions();
    window.addEventListener('resize', this._updateDimensions);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateDimensions);
  }

  /**
   * @return {number}
   * @private
   */
  _getNumSlicesPerDay() {
    const HOURS_PER_DAY = 24;

    /** @type {number} */
    const slicesPerHour = this.configs.slice.slicesPerHour;

    return slicesPerHour * HOURS_PER_DAY;
  }

  /**
   * Update dimensions
   * @private
   */
  _updateDimensions() {
    if (window.innerWidth < 800) {
      // TODO: fold menu
    }

    const parentWidth = this.rootNode.parentElement.clientWidth;

    let style = window.getComputedStyle(this.rootNode, null);
    const rootNodePaddingH =
        parseInt(style.getPropertyValue('padding-left'), 10) +
        parseInt(style.getPropertyValue('padding-right'), 10);

    const bodyMaxWidth = parentWidth - rootNodePaddingH;
    const datesWidth = this.datesNode.offsetWidth;
    const slicesMaxWidth = bodyMaxWidth - datesWidth;

    const {width: sliceWidth, gap: sliceGapH} =
        this._calcSliceSize(slicesMaxWidth);

    const tableWidth = datesWidth +
        (sliceWidth + sliceGapH) * this.numSlicesPerDay - sliceGapH;

    if (this.state.dimensions.tableWidth !== tableWidth ||
        this.state.dimensions.sliceWidth !== sliceWidth ||
        this.state.dimensions.sliceGapH !== sliceGapH) {
      this.setState({
        dimensions: {tableWidth, sliceWidth, sliceGapH},
      });
    }
  }

  /**
   * @param {number} slicesMaxWidth
   * @return {{width: number, gap: number}}
   * @private
   */
  _calcSliceSize(slicesMaxWidth) {
    const totalBig = Math.ceil(slicesMaxWidth / this.numSlicesPerDay);
    const {width, gap} = TimeTable._getWidthAndGap(totalBig);

    if ((width + gap) * this.numSlicesPerDay - gap > slicesMaxWidth) {
      const totalSmall = Math.floor(slicesMaxWidth / this.numSlicesPerDay);
      return TimeTable._getWidthAndGap(totalSmall);
    }

    return {width, gap};
  }

  /**
   * @param {number} total
   * @return {{width: number, gap: number}}
   * @private
   */
  static _getWidthAndGap(total) {
    const WIDTH_SCALE = 4;
    const GAP_SCALE = 1;
    const MIN_WIDTH = 2;
    const MIN_GAP = 1;

    if (total < MIN_WIDTH + MIN_GAP) {
      console.warn(`Table width is too small: slice total width ${total}`);
      return {width: MIN_WIDTH, gap: MIN_GAP};
    }

    let width = Math.floor(total / (WIDTH_SCALE + GAP_SCALE) * WIDTH_SCALE);
    width = Math.max(width, MIN_WIDTH);
    let gap = total - width;
    gap = Math.max(gap, MIN_GAP);

    if (width + gap !== total) {
      width = total - gap;
      if (width < MIN_WIDTH) {
        console.warn(`Table width is too small: slice total width ${total}`);
        return {width: MIN_WIDTH, gap: MIN_GAP};
      }
    }

    return {width, gap};
  }

  /**
   * TODO: implement
   * Get tasks from the remote server
   * @return {Array.<Object>}
   */
  getTasks() {
    return [
      {
        begin: 1513863200000, // 2017-12-21 21:33 +0800
        end: 1513864200000, // 2017-12-21 21:50 +0800
        name: 'test task 001 test task 001 test task 001 test task 001'
          + ' test task 001 test task 001 test task 001 test task 001'
          + ' test task 001 test task 001 test task 001 test task 001',
        project: 'test project 001 test project 001',
        tags: ['test tag 001', 'test tag 002', 'test tag 003'],
      },
      {
        begin: 1513949600000, // 2017-12-22 21:33 +0800
        end: 1513950600000, // 2017-12-22 21:50 +0800
        name: 'test task 002 test task 002 test task 002 test task 002',
        project: 'test project 001',
        tags: ['test tag 002', 'test tag 003', 'test tag 004'],
      },
      {
        begin: 1514036000000, // 2017-12-23 21:33:20 +0800
        end: 1514037000000, // 2017-12-23 21:50:00 +0800
        name: 'test task 003 test task 003 test task 003 test task 003',
        project: 'test project 002',
        tags: ['test tag 003', 'test tag 004', 'test tag 005'],
      },
    ];
  }

  /**
   * @param {Array.<SelectableItem>} selectedItems
   */
  onSelectionFinish(selectedItems) {
    // TODO: get date & time
    console.info(selectedItems);
    // TODO: log duration

    // TODO: 显示所选时间段，并出现一行文本框，提示填写任务名，填写任务名之后继续显示其他填写项
  }

  /**
   * @param {number} begin
   * @param {?number} taskId
   */
  onSliceEnter(begin, taskId) {
    this.hovered.begin = begin;
    this.hovered.taskId = taskId;

    if (this.hovered.timeoutID !== null) {
      window.clearTimeout(this.hovered.timeoutID);
      this.hovered.timeoutID = null;
    }

    let hoveredTask = null;
    if (taskId !== null) {
      hoveredTask = this.state.tasks[taskId];
    }

    if (this.state.hoveredTask === hoveredTask) {
      return;
    }

    this.setState({hoveredTask});
  }

  /**
   * @param {number} begin
   * @param {?number} taskId
   */
  onSliceLeave(begin, taskId) {
    this.hovered.begin = null;
    this.hovered.taskId = null;

    if (this.hovered.timeoutID !== null) {
      window.clearTimeout(this.hovered.timeoutID);
      this.hovered.timeoutID = null;
    }

    this.hovered.timeoutID = window.setTimeout(() => {
      if (this.hovered.begin === null &&
          this.hovered.taskId === null &&
          this.state.hoveredTask !== null) {
        this.setState({hoveredTask: null});
      }
    }, 500);
  }
}

export {TimeTable};
