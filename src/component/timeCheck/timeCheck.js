import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DBHandler from '../../lowDB/lowDB';
import { defaultFuncProps } from '../../js/error';

const defaultProps = {
  currentDay: '',
  setCurrentDay: defaultFuncProps('setCurrentDay')
};
const propTypes = {
  currentDay: PropTypes.string,
  setCurrentDay: PropTypes.func
};

class TimeCheck extends Component {
  constructor(props) {
    super(props);
    this.studied = [];
    this.rest = [];
    this.totalStudied = '';
    this.setData.bind(this);
  }

  setData(currentDay) {
    if (currentDay !== '' && currentDay !== null) {
      const data = DBHandler.getStudiedAndRest(currentDay);

      if (data === undefined) {
        return;
      } else {
        this.studied = data.studiedData;
        this.rest = data.restData;
        this.totalStudied = data.totalData;
      }
    }
  }

  componentDidUpdate() {
    this.setData(this.props.currentDay);
  }

  render() {
    return (
      <div className="right">
        <div className="right-top">
          <h3>Time Checker</h3>
        </div>
        <div className="right-left">
          <div className="title">Studied</div>
          {this.studied.map(elem => {
            return <div className="studied-time">{elem}</div>;
          })}
        </div>
        <div className="right-right">
          <div className="title">Rest</div>
          <div>
            {this.rest.map(elem => {
              return <div className="rest-time">{elem}</div>;
            })}
          </div>
        </div>
        <div className="right-bottom">
          <div className="total">Total Studied : {this.totalStudied}</div>
        </div>
      </div>
    );
  }
}

TimeCheck.propTypes = propTypes;
TimeCheck.defaultProps = defaultProps;

export default TimeCheck;
