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
        <div className="right-top">
          <h3>Time Checker</h3>
        </div>
        <div className="right-left">
          <span className="title">Study</span>
          <h5>01:22:13 학습</h5>
          <h5>01:00:00 학습</h5>
          <h5>00:56:13 학습</h5>
          <h5>01:50:33 학습</h5>
          <h5>02:30:10 학습</h5>
          <h5>04:21:13 학습</h5>
        </div>
        <div className="right-right">
          <span className="title">Rest</span>
          <h5>00:20:31</h5>
          <h5>00:20:31</h5>
          <h5>00:20:31</h5>
          <h5>00:20:31</h5>
          <h5>00:20:31</h5>
        </div>
        <div className="right-bottom">
          <span className="total">Total : 12:00:00 학습</span>
        </div>
      </div>
    );
  }
}

TimeCheck.propTypes = propTypes;
TimeCheck.defaultProps = defaultProps;

export default TimeCheck;
