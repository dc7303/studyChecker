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
        />
        <TimeCheck />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clockFormat: state.timeReducer.clockFormat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clockHandler: () => {
      dispatch(actions.clockStart());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
