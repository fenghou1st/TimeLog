import React, {Component} from 'react';
import {SelectableGroup} from 'react-selectable-fast';

import {loadConfig} from 'src/base/js/config';
import {Body} from './body.jsx';
import {Ruler} from './ruler.jsx';
import {Task} from './task.jsx';
import styles from './index.scss';

// const language = loadConfig().language;
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
      projects: this.getProjects(),
      tags: this.getTags(),
      dimensions: {
        tableWidth: 800,
        sliceWidth: 4,
        sliceGapH: 1,
      },
      selected: {
        taskId: null,
        periods: [],
        taskName: null,
        projectId: null,
        tagIds: [],
      },
    };

    /** @type {Object} */
    this.configs = loadConfig().timeLog.timeTable;

    this.numSlicesPerDay = this._getNumSlicesPerDay();

    /** @type {Element} */
    this.rootNode = null;
    /** @type {SelectableGroup} */
    this.selectableGroup = null;
    /** @type {Element} */
    this.datesNode = null;

    this._updateDimensions = this._updateDimensions.bind(this);
    this.onSelectUnusedSlices = this.onSelectUnusedSlices.bind(this);
    this.onSelectUsedSlice = this.onSelectUsedSlice.bind(this);
    this.onChangeTaskData = this.onChangeTaskData.bind(this);
  }

  /**
   * @return {*}
   */
  render() {
    const scaleWidth = this.state.dimensions.sliceWidth +
        this.state.dimensions.sliceGapH;

    return (
        <div className={styles.table}
             style={{width: this.state.dimensions.tableWidth}}
             ref={(el) => this.rootNode = el}
        >
          <SelectableGroup className={styles.selectableGroup}
                           enableDeselect
                           onSelectionFinish={this.onSelectUnusedSlices}
                           ignoreList={['.not-selectable']}
                           ref={(el) => this.selectableGroup = el}
          >
            <Ruler position='top'
                   configs={this.configs}
                   scaleWidth={scaleWidth}
            />
            <Body tasks={this.state.tasks}
                  selectedTaskId={this.state.selected.taskId}
                  configs={this.configs}
                  sliceWidth={this.state.dimensions.sliceWidth}
                  sliceGapH={this.state.dimensions.sliceGapH}
                  numSlicesPerDay={this.numSlicesPerDay}
                  onSelectUsedSlice={this.onSelectUsedSlice}
                  setDatesRef={(el) => this.datesNode = el}
            />
            <Ruler position='bottom'
                   configs={this.configs}
                   scaleWidth={scaleWidth}
            />
          </SelectableGroup>
          {
            this.state.selected.periods.length > 0 &&
            <Task data={this.state.selected}
                  projects={this.state.projects}
                  tags={this.state.tags}
                  rootNode={this.rootNode}
                  onChangeData={this.onChangeTaskData}
            />
          }
        </div>
    );
  }

  /**
   * TODO: remove
   * Test only
   */
  componentDidUpdate() {
    console.info('Time-table re-rendered');
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
      this.setState({dimensions: {tableWidth, sliceWidth, sliceGapH}});
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
   * @return {Map<number,Object>}
   */
  getTasks() {
    return new Map([
      [
        1, {
        begin: 1513863200000, // 2017-12-21 21:33 +0800
        end: 1513864200000, // 2017-12-21 21:50 +0800
        name: 'test task 001 test task 001 test task 001 test task 001'
        + ' test task 001 test task 001 test task 001 test task 001'
        + ' test task 001 test task 001 test task 001 test task 001',
        projectId: 1,
        tagIds: [1, 2, 3],
      }],
      [
        2, {
        begin: 1513949600000, // 2017-12-22 21:33 +0800
        end: 1513950600000, // 2017-12-22 21:50 +0800
        name: 'test task 002 test task 002 test task 002 test task 002',
        projectId: 2,
        tagIds: [2, 3, 4],
      }],
      [
        3, {
        begin: 1514036000000, // 2017-12-23 21:33:20 +0800
        end: 1514037000000, // 2017-12-23 21:50:00 +0800
        name: 'test task 003 test task 003 test task 003 test task 003',
        projectId: 3,
        tagIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }],
    ]);
  }

  /**
   * TODO: implement
   * Get projects from the remote server
   * @return {Map<number,Object>}
   */
  getProjects() {
    return new Map([
      [1, {name: 'test project 001', tagIds: [1, 2, 3]}],
      [2, {name: 'test project 002', tagIds: [2, 3, 4]}],
      [3, {name: 'test project 003', tagIds: [3, 4, 5]}],
      [4, {name: 'test project 004', tagIds: [4]}],
      [5, {name: 'test project 005', tagIds: [5]}],
      [6, {name: 'test project 006', tagIds: [6]}],
      [7, {name: 'test project 007', tagIds: [7]}],
      [8, {name: 'test project 008', tagIds: [8]}],
      [9, {name: 'test project 009', tagIds: [9]}],
      [10, {name: 'test project 010', tagIds: [10]}],
      [11, {name: 'test project 011', tagIds: [11]}],
      [12, {name: 'test project 012', tagIds: [12]}],
      [13, {name: 'test project 013', tagIds: [13]}],
      [14, {name: 'test project 014', tagIds: [14]}],
      [15, {name: 'test project 015', tagIds: [15]}],
      [16, {name: 'test project 016', tagIds: [16]}],
      [17, {name: 'test project 017', tagIds: [17]}],
      [18, {name: 'test project 018', tagIds: [18]}],
      [19, {name: 'test project 019', tagIds: [19]}],
      [20, {name: 'test project 020', tagIds: [20]}],
      [21, {name: 'test project 021', tagIds: [21]}],
    ]);
  }

  /**
   * TODO: implement
   * Get tags from the remote server
   * @return {Map<number,Object>}
   */
  getTags() {
    return new Map([
      [1, {name: 'test tag 001', styleId: 1}],
      [2, {name: 'test tag 002', styleId: 2}],
      [3, {name: 'test tag 003', styleId: 3}],
      [4, {name: 'test tag 004', styleId: 4}],
      [5, {name: 'test tag 005', styleId: 5}],
      [6, {name: 'test tag 006', styleId: 6}],
      [7, {name: 'test tag 007', styleId: 7}],
      [8, {name: 'test tag 008', styleId: 8}],
      [9, {name: 'test tag 009', styleId: 9}],
      [10, {name: 'test tag 010', styleId: 10}],
      [11, {name: 'test tag 011', styleId: 11}],
      [12, {name: 'test tag 012', styleId: 12}],
      [13, {name: 'test tag 013', styleId: 13}],
      [14, {name: 'test tag 014', styleId: 14}],
      [15, {name: 'test tag 015', styleId: 15}],
      [16, {name: 'test tag 016', styleId: 16}],
      [17, {name: 'test tag 017', styleId: 17}],
      [18, {name: 'test tag 018', styleId: 18}],
      [19, {name: 'test tag 019', styleId: 19}],
      [20, {name: 'test tag 020', styleId: 20}],
      [21, {name: 'test tag 021', styleId: 21}],
    ]);
  }

  /**
   * @param {Array.<SelectableItem>} slices
   */
  onSelectUnusedSlices(slices) {
    const periods = this._getPeriods(slices);

    if (this.state.selected.taskId !== null) {
      this.setState({
        selected: {
          taskId: null,
          periods: periods,
          taskName: null,
          projectId: null,
          tagIds: [],
        },
      });
    } else {
      this.setState((prevState, props) => ({
        selected: {
          taskId: prevState.selected.taskId,
          periods: periods,
          taskName: prevState.selected.taskName,
          projectId: prevState.selected.projectId,
          tagIds: prevState.selected.tagIds,
        },
      }));
    }
  }

  /**
   * @param {number} taskId
   * @param {number} begin - Begin time of the slice
   */
  onSelectUsedSlice(taskId, begin) {
    this.clearSelection();

    const task = this.state.tasks.get(taskId);

    this.setState({
      selected: {
        taskId: taskId,
        periods: [{begin: task.begin, end: task.end}],
        taskName: task.name,
        projectId: task.projectId,
        tagIds: task.tagIds,
      },
    });
  }

  /**
   * @param {string} taskName
   * @param {number} projectId
   * @param {Array<number>} tagIds
   */
  onChangeTaskData(taskName, projectId, tagIds) {
    this.setState((prevState, props) => ({
      selected: {
        taskId: prevState.selected.taskId,
        periods: prevState.selected.periods,
        taskName: taskName,
        projectId: projectId,
        tagIds: tagIds,
      },
    }));
  }

  /**
   * Deselect all slices
   */
  clearSelection() {
    this.selectableGroup.clearSelection();
    this.onSelectUnusedSlices([]);
  }

  /**
   * @param {Array.<SelectableItem>} slices
   * @return {Array.<Object>}
   * @private
   */
  _getPeriods(slices) {
    /** @type {number} */
    const msPerHour = 60 * 60 * 1000;
    const slicesPerHour = this.configs.slice.slicesPerHour;
    const duration = msPerHour / slicesPerHour;

    const beginTimes = slices.map((item) => item.props.begin);
    beginTimes.sort((lhs, rhs) => lhs - rhs);

    const periods = [];
    let currBegin = null;
    let currEnd = null;
    beginTimes.forEach((begin) => {
      if (currBegin === null) {
        currBegin = begin;
        currEnd = currBegin + duration;
        return;
      }

      if (begin === currEnd) { // seamless join
        currEnd = begin + duration;
      } else if (begin > currEnd) { // found a gap
        periods.push({begin: currBegin, end: currEnd});
        currBegin = begin;
        currEnd = currBegin + duration;
      } else { // data error
        throw new Error(`Slices not sorted in ascending order`);
      }
    });

    if (currBegin !== null) {
      periods.push({begin: currBegin, end: currEnd});
    }

    return periods;
  }
}

export {TimeTable};
