// Requirements ////////////////////////////////////////////////////////////////
import 'babel-polyfill';
import React, {Component} from 'react';
import {render} from 'react-dom';

import {loadConfig} from 'src/base/js/config';
import {TimeLog} from 'src/components/time-log/index.jsx';

import styles from './index.scss';

const language = loadConfig().language;
const transData = require(`./translations.${language}.yml`);

// Definitions /////////////////////////////////////////////////////////////////

// Classes /////////////////////////////////////////////////////////////////////

/**
 * Main component of the app
 */
class Main extends Component {
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
    return (
        <div className={styles.main}>
          <TimeLog title={transData.title} />
          <div className={styles.credit}>
            Copyright (c) 2017 <a href="mailto:fenghou1st@gmail.com">Fenghou</a>
          </div>
        </div>
    );
  }
}

// Functions ///////////////////////////////////////////////////////////////////

// Initializations /////////////////////////////////////////////////////////////

document.title = transData.title;

render(<Main />, document.getElementById('app'));
