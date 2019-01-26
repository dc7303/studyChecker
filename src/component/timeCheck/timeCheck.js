import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DBHandler from '../../lowDB/lowDB';

const defaultProps = {
  currentDay: ''
};
const propTypes = {
  currentDay: PropTypes.string
};

class TimeCheck extends Component {
  constructor(props) {
    super(props);
    this.studied = [];
    this.rest = [];
    this.totalStudied = '';
  }

  setData(currentDay) {
    let data = [];
    const studied = [];
    const rest = [];

    if (currentDay !== '' && currentDay !== null) {
      data = DBHandler.getStudiedAndRest(currentDay);

      data.studiedData.forEach(elem => {
        studied.push(elem);
      });

      data.restData.forEach(elem => {
        rest.push(elem);
      });
    }

    this.studied = studied;
    this.rest = rest;
    this.totalStudied = data.totalData;
  }

  componentDidUpdate() {
    this.setData(this.props.currentDay);
  }

  render() {
    return (
      <div className="right">
        <div>{this.props.currentDay}</div>
        <div className="right-top">
          <h3>Time Checker</h3>
        </div>
        <div className="right-left">
          <span className="title">Studied</span>
          {this.studied.map(elem => {
            return <div className="studied-time">{elem}</div>;
          })}
        </div>
        <div className="right-right">
          <span className="title">Rest</span>
          <div>
            {this.rest.map(elem => {
              return <div className="rest-time">{elem}</div>;
            })}
          </div>
        </div>
        <div className="right-bottom">
          <span className="total">Total Studied : {this.totalStudied}</span>
        </div>
      </div>
    );
  }
}

TimeCheck.propTypes = propTypes;
TimeCheck.defaultProps = defaultProps;

export default TimeCheck;
