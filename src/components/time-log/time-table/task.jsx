import React, {Component} from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import ReactTooltip from 'react-tooltip';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

import {loadConfig} from 'src/base/js/config';
import {ProjectSelector} from 'src/components/time-log/project/selector.jsx';
import styles from './task.scss';

const boundClassNames = classNames.bind(styles);

const language = loadConfig().language;
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

    this.state = {
      openedModal: null,
    };

    this.DATE_FORMAT = 'MM-DD';
    this.TIME_FORMAT = 'HH:mm';

    this.MODAL_PROJECT_SELECTOR = 'ProjectSelector';
    this.MODAL_TAG_SELECTOR = 'TagSelector';
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <div className={styles.task}>
          <div className={styles.periodsAndName}>
            <FontAwesome className={styles.icon}
                         name='clock-o'
                         cssModule={faStyles}
            />
            {this._renderPeriods()}
            <input className={styles.name}
                   type='text'
                   value={this.props.data.taskName || ''}
                   placeholder={transData.task.name.placeholder}
                   autoFocus={true}
                   onChange={(ev) => this.onChangeName(ev)}
            />
          </div>
          {this._renderProject()}
          {this._renderTags()}

          <ProjectSelector
              isOpen={this.state.openedModal === this.MODAL_PROJECT_SELECTOR}
              onClose={this.onProjectSelectorClose.bind(this)}
              getParent={() => this.getModalParent()}
          />
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
    let projectName = null;
    if (this.props.data.projectId !== null) {
      const project = this.props.projects.get(this.props.data.projectId);
      projectName = project.name;
    }

    const placeholder = transData.task.projectName.placeholder;

    return (
        <div className={styles.project}>
          <FontAwesome className={styles.icon}
                       name='cube'
                       cssModule={faStyles}
          />
          <div className={styles.name}>
            <span onClick={() => this.onChangeProject()}>
              {projectName !== null ? projectName : placeholder}
            </span>
            {
              projectName !== null &&
              <FontAwesome className={styles.remove}
                           name='remove'
                           cssModule={faStyles}
                           onClick={() => this.onRemoveProject()}
              />
            }
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
                         onClick={() => this.onAddTag()}
            />
          </div>
        </div>
    );
  }

  /**
   * Get modal's parent node
   * @return {Element}
   */
  getModalParent() {
    return this.props.rootNode.parentElement;
  }

  /**
   * On change project
   */
  onChangeProject() {
    this.setState({openedModal: this.MODAL_PROJECT_SELECTOR});
  }

  /**
   * On close project selector
   * @param {?number} projectId
   */
  onProjectSelectorClose(projectId) {
    this.setState({openedModal: null});

    if (projectId !== null) {
      this.props.onChangeData(
          this.props.data.taskName, projectId, this.props.data.tagIds);
    }
  }

  /**
   * TODO: implement
   * On remove project
   */
  onRemoveProject() {
    console.log('Remove project');
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
   * @param {SyntheticEvent} ev
   */
  onChangeName(ev) {
    this.props.onChangeData(
        ev.target.value, this.props.data.projectId, this.props.data.tagIds);
  }
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
  projects: PropTypes.instanceOf(Map).isRequired,
  tags: PropTypes.instanceOf(Map).isRequired,
  rootNode: PropTypes.instanceOf(Element).isRequired,
  onChangeData: PropTypes.func.isRequired,
};

export {Task};
