import React, { Component } from 'react';

const defaultProps = {};
const propTypes = {};

class TimeCheck extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="right">
        <h1>Layout Test</h1>
        <h3>right</h3>
      </div>
    );
  }
}

TimeCheck.propTypes = propTypes;
TimeCheck.defaultProps = defaultProps;

export default TimeCheck;
