import React, { Component } from 'react';

import Graph from './graph/graph';
import Time from './time/time';
import timeCheck from './timeCheck/timeCheck';
import TimeCheck from './timeCheck/timeCheck';

class Counter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph />
        <Time />
        <TimeCheck />
      </div>
    );
  }
}

export default Counter;
