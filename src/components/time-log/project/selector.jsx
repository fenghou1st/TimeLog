import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

import {loadConfig} from 'src/base/js/config';
import styles from './selector.scss';

const language = loadConfig().language;
const transData = require(`./translations.${language}.yml`);

/**
 * Project selector
 */
class ProjectSelector extends Component {
  /**
   * @param {?Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      results: [],
    };
  }

  /**
   * @return {*}
   */
  render() {
    return (
        <Modal
            className={styles.modal}
            overlayClassName={styles.overlay}
            isOpen={this.props.isOpen}
            onRequestClose={() => this.close()}
            contentLabel='Project Selector'
            appElement={this.props.getParent()}
            parentSelector={this.props.getParent}
        >
          <div className={styles.search}>
            <FontAwesome className={styles.icon}
                         name='search'
                         cssModule={faStyles}
            />
            <input className={styles.input}
                   type='text'
                   value={this.state.name}
                   placeholder={transData.selector.search.placeholder}
                   autoFocus={true}
                   onChange={(ev) => this.onChangeSearch(ev)}
            />
          </div>
          <div className={styles.list}>
          </div>
        </Modal>
    );
  }

  /**
   * On change search text
   * @param {SyntheticEvent} ev
   */
  onChangeSearch(ev) {
    this.setState({name: ev.target.value});

    // TODO: search projects, show project list
  }

  /**
   * Close the modal
   */
  close() {
    this.props.onClose(null);
  }

  /**
   * Close the modal after select project
   * @param {number} projectId
   */
  onSelect(projectId) {
    this.props.onClose(projectId);
  }
}

ProjectSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  getParent: PropTypes.func.isRequired,
};

export {ProjectSelector};
