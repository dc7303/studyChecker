import React, { Component } from 'react';

const defaultProps = {};
const propTypes = {};

class Time extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="center">
        <h1>Layout Test</h1>
        <h3>center</h3>
      </div>
    );
  }
}

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;

export default Time;
