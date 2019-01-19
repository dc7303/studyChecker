import React, { Component } from 'react';

import clock from './clock';

const defaultProps = {};
const propTypes = {};

let clockText = '';

class Time extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <h1>{clockText}</h1>
        <h3>center</h3>
      </div>
    );
  }
}

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;

export default Time;
