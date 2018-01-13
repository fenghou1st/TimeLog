import React, {Component} from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import ReactTooltip from 'react-tooltip';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

import styles from './task.scss';

const boundClassNames = classNames.bind(styles);

const language = 'en';
const transData = require(`./translations.${language}.yml`);

/**
 * Task component of the time table
 */
class Task extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.DATE_FORMAT = 'MM-DD';
    this.TIME_FORMAT = 'HH:mm';

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <div className={styles.task}>
          <div className={styles.periodsAndName}>
            {this._renderPeriods()}
            <input className={styles.name}
                   type='text'
                   value={this.props.data.taskName || ''}
                   placeholder={transData.task.name.placeholder}
                   autoFocus={true}
                   onChange={this.onChangeName}
            />
          </div>
          {this._renderProject()}
          {this._renderTags()}
        </div>
    );
  }

  // /**
  //  * TODO: remove
  //  * Test only
  //  */
  // componentDidUpdate() {
  //   console.info('Time-table\'s task-creation re-rendered');
  // }

  /**
   * @return {Array}
   * @private
   */
  _renderPeriods() {
    const MAX_SHOWN_PERIODS = 3;

    const periods = this.props.data.periods;
    const numShownPeriods = Math.min(periods.length, MAX_SHOWN_PERIODS);

    const periodComponents = [];
    for (let i = 0; i < numShownPeriods; ++i) {
      const period = periods[i];
      const beginTime = moment(period.begin);
      const endTime = moment(period.end);
      periodComponents.push(
          <span key={period.begin} className={styles.period}>
            <span className={styles.timeBegin}>
              <span className={styles.timeDate}>
                {beginTime.format(this.DATE_FORMAT)}
              </span>
              <span className={styles.timeTime}>
                {beginTime.format(this.TIME_FORMAT)}
              </span>
            </span>
            <span className={styles.timeEnd}>
              <span className={styles.timeDate}>
                {endTime.format(this.DATE_FORMAT)}
              </span>
              <span className={styles.timeTime}>
                {endTime.format(this.TIME_FORMAT)}
              </span>
            </span>
          </span>,
      );
    }

    if (periods.length > numShownPeriods) {
      periodComponents.push(
          <span key='ellipsis'
                className={styles.ellipsis}
                data-tip={`Total ${periods.length} periods`}
          >
            ...
          </span>,
      );
      periodComponents.push(<ReactTooltip key='tooltip' effect='solid'/>);
    }

    return periodComponents;
  }

  /**
   * @return {*}
   * @private
   */
  _renderProject() {
    let projectName = transData.task.projectName.placeholder;

    if (this.props.data.projectId !== null) {
      const project = this.props.projects.get(this.props.data.projectId);
      projectName = project.name;
    }

    return (
        <div className={styles.project}>
          <FontAwesome className={styles.icon}
                       name='cube'
                       cssModule={faStyles}/>
          <div className={styles.name}
               onClick={this.onChangeProject}
          >
            {projectName}
          </div>
        </div>
    );
  }

  /**
   * @return {Array}
   * @private
   */
  _renderTags() {
    const tags = new Map();

    if (this.props.data.projectId !== null) {
      const project = this.props.projects.get(this.props.data.projectId);
      project.tagIds.map((tagId) => {
        const tag = this.props.tags.get(tagId);
        tags.set(tagId, tag);
      });
    }

    if (this.props.data.tagIds !== null) {
      this.props.data.tagIds.map((tagId) => {
        const tag = this.props.tags.get(tagId);
        tags.set(tagId, tag);
      });
    }

    const tagComponents = [];
    tags.forEach((tag, tagId) => {
      tagComponents.push(
          <div key={tagId}
               className={boundClassNames('name', [`style-${tag.styleId}`])}
          >
            <span>{tag.name}</span>
            <FontAwesome className={styles.remove}
                         name='remove'
                         cssModule={faStyles}
                         onClick={() => this.onRemoveTag(tagId)}
            />
          </div>,
      );
    });

    return (
        <div className={styles.tagsWrapper}>
          <FontAwesome className={styles.icon}
                       name='tags'
                       cssModule={faStyles}
          />
          <div className={styles.tags}>
            {tagComponents}
            <FontAwesome className={styles.add}
                         name='plus'
                         cssModule={faStyles}
                         onClick={this.onAddTag}
            />
          </div>
        </div>
    );
  }

  /**
   * TODO: implement
   * On change project
   */
  onChangeProject() {
    console.log('Change project');
  }

  /**
   * TODO: implement
   * On add tag
   */
  onAddTag() {
    console.log('Add tag');
  }

  /**
   * TODO: implement
   * On remove tag
   * @param {number} tagId
   */
  onRemoveTag(tagId) {
    console.log(`Remove tag ${tagId}`);
  }

  /**
   * @param {Event} event
   */
  onChangeName(event) {
    this.props.onChangeData(
        event.target.value, this.props.data.projectId, this.props.data.tagIds);
  }
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
  projects: PropTypes.instanceOf(Map).isRequired,
  tags: PropTypes.instanceOf(Map).isRequired,
  onChangeData: PropTypes.func.isRequired,
};

export {Task};
