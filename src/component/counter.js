/**
 * Smart Component
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Graph from './graph/graph';
import Time from './time/time';
import TimeCheck from './timeCheck/timeCheck';

import * as actions from '../action';

class Counter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph />
        <Time
          clockFormat={this.props.clockFormat}
          clockHandler={this.props.clockHandler}
          startTime={this.props.startTime}
          endTime={this.props.endTime}
          studyStart={this.props.studyStart}
          studyStop={this.props.studyStop}
        />
        <TimeCheck />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clockFormat: state.timeReducer.clockFormat,
    startTime: state.timeReducer.startTime,
    endTime: state.timeReducer.endTime
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clockHandler: () => {
      dispatch(actions.clockStart());
    },
    studyStart: () => {
      dispatch(actions.studyStart());
    },
    studyStop: () => {
      dispatch(actions.studyStop());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
