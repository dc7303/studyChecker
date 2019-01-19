import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const defaultProps = {
  clockFormat: '00:00:00',
  clockHandler: () => console.error('clockHandler undefined')
};
const propTypes = {
  clockFormat: PropTypes.string,
  clockHandler: PropTypes.func
};

class Time extends Component {
  constructor(props) {
    super(props);
    this.timeHandler = this.timeHandler.bind(this);
  }

  timeHandler() {
    console.log('출력');
    setInterval(this.props.clockHandler, 1000);
  }

  render() {
    return (
      <div className="center">
        <h1 onClick={this.timeHandler}>{this.props.clockFormat}</h1>
        <h3>center</h3>
      </div>
    );
  }
}

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;

export default Time;
