import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import db from '../../lowDB/lowDB';

import * as confirmOption from '../../js/confirmAlertOption';

const defaultFuncProps = funcName => {
  return () => alert(`${funcName} undefined`);
};

const defaultProps = {
  clockFormat: '',
  clockHandler: defaultFuncProps('clockHandler'),
  studyStart: defaultFuncProps('studyStart'),
  studyStop: defaultFuncProps('studyStop'),
  studyReset: defaultFuncProps('studyReset'),
  startTime: '',
  endTime: ''
};

const propTypes = {
  clockFormat: PropTypes.string,
  clockHandler: PropTypes.func,
  studyStart: PropTypes.func,
  studyStop: PropTypes.func,
  studyReset: PropTypes.func,
  startTime: PropTypes.string,
  endTime: PropTypes.string
};

let _CURRENTDAY = '';

/**
 * Component
 */
class Time extends Component {
  constructor(props) {
    super(props);
    this.timeHandler = this.timeHandler.bind(this);
    this.confirmForAction = this.confirmForAction.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.saveStudyTime = this.saveStudyTime.bind(this);
  }

  /**
   * clock 동작시키는 함수
   */
  timeHandler() {
    setInterval(this.props.clockHandler, 1000);
  }

  /**
   * 날짜가 변경하는걸 감지하는 함수
   */
  todayChecker() {
    const currentDay = this.props.clockFormat.slice(0, 10);

    if (_CURRENTDAY !== currentDay) {
      _CURRENTDAY = currentDay;
    } else if (_CURRENTDAY === currentDay) {
      //전체 자동 세이브 진행.
    }
  }

  /*
    Clock 
   */
  componentWillMount() {
    this.timeHandler();
  }

  componentDidUpdate() {
    this.todayChecker();
  }

  saveStudyTime() {
    const startTime = this.props.startTime;
    const endTime = this.props.endTime;

    //시작시간 저장
    db.get(`${_CURRENTDAY}.startTime`)
      .push(startTime)
      .write();

    //종료시간 저장
    db.get(`${_CURRENTDAY}.endTime`)
      .push(endTime)
      .write();
  }

  /**
   * button handler
   *
   * @param {event} event
   */
  confirmForAction(event) {
    const studyStart = this.props.studyStart;
    const studyStop = this.props.studyStop;
    const msgNameStart = '시작';
    const msgNameStop = '중지';
    const targetId = event.target.id;

    //event select
    if (targetId === 'startBtn') {
      confirmAlert(confirmOption.startConfirm(msgNameStart, studyStart));
    } else if (targetId === 'stopBtn') {
      if (this.props.startTime !== '' && this.props.startTime !== null) {
        confirmAlert(confirmOption.stopConfirm(msgNameStop, studyStop));
      } else {
        alert('start 후 사용가능합니다.');
      }
    }
  }

  /**
   * reset button handler
   */
  resetHandler() {
    const studyReset = this.props.studyReset;
    confirmAlert(confirmOption.studyReset(studyReset));
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
        <div className="center-control">
          <button id="startBtn" onClick={this.confirmForAction}>
            Start
          </button>
          <button id="stopBtn" onClick={this.confirmForAction}>
            Stop
          </button>
          <button onClick={this.resetHandler}>Reset</button>
        </div>
      </div>
    );
  }
}

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;

export default Time;
