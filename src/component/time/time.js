import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const defaultFuncProps = funcName => {
  return () => console.log(`${funcName} undefined`);
};

const defaultProps = {
  clockFormat: '',
  clockHandler: defaultFuncProps('clockHandler'),
  studyStart: defaultFuncProps('studyStart'),
  studyStop: defaultFuncProps('studyStop'),
  startTime: '00:00:00',
  endTime: '00:00:00'
};

const propTypes = {
  clockFormat: PropTypes.string,
  clockHandler: PropTypes.func,
  studyStart: PropTypes.func,
  studyStop: PropTypes.func,
  startTime: PropTypes.string,
  endTime: PropTypes.string
};

class Time extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.timeHandler = this.timeHandler.bind(this);
  }

  timeHandler() {
    setInterval(this.props.clockHandler, 1000);
  }

  componentWillMount() {
    this.timeHandler();
  }

  render() {
    return (
      <div className="center">
        <div className="center-top">
          <h3>I see your study</h3>
        </div>
        <div>
          <h1>{this.props.clockFormat}</h1>
        </div>
        <div className="center-clock">
          Start : {this.props.startTime} <br />
          End : {this.props.endTime}
        </div>
        <div>
          <button onClick={this.props.studyStart}>Start</button>
          <button onClick={this.props.studyStop}>Stop</button>
          <button>Apply</button>
        </div>
      </div>
    );
  }
}

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;

export default Time;
