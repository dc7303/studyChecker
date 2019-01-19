import React, { Component } from 'react';

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
        <h1>{this.props.clockFormat}</h1>
        <h3>center</h3>
      </div>
    );
  }
}

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;

export default Time;
