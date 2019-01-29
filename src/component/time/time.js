import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { insertStudyTime } from '../../lowDB/lowDB';
import { defaultFuncProps } from '../../js/error';
import * as confirmOption from '../../js/options/confirmAlertOption';

const defaultProps = {
  clockFormat: '',
  clockHandler: defaultFuncProps('clockHandler'),
  studyStart: defaultFuncProps('studyStart'),
  studyStop: defaultFuncProps('studyStop'),
  studyReset: defaultFuncProps('studyReset'),
  startTime: '',
  endTime: '',
  currentDay: ''
};

const propTypes = {
  clockFormat: PropTypes.string,
  clockHandler: PropTypes.func,
  studyStart: PropTypes.func,
  studyStop: PropTypes.func,
  studyReset: PropTypes.func,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  setCurrentDay: PropTypes.func
};

/**
 * Current YYYY-MM-DD
 */
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
    this.saveForNextDay = this.saveForNextDay.bind(this);
  }

  /**
   * clock 동작시키는 함수
   */
  timeHandler() {
    setInterval(this.props.clockHandler, 1000);
  }

  saveForNextDay(currentDay) {
    this.props.studyStop();

    insertStudyTime(currentDay, this.props.startTime, this.props.startTime);
    this.props.studyReset();
    this.props.studyStart();
  }

  /**
   * 날짜가 변경하는걸 감지하는 함수
   */
  todayChecker() {
    this.props.setCurrentDay();

    const currentDay = this.props.currentDay;

    if (_CURRENTDAY !== currentDay) {
      if (_CURRENTDAY !== '' && _CURRENTDAY !== null) {
        //작동 불능. mark에서 수정필요.
        //this.saveForNextDay(currentDay);
      }

      _CURRENTDAY = currentDay;
    }
  }

  componentWillMount() {
    //clock 동작 loop
    this.timeHandler();
  }

  componentDidUpdate() {
    //현재시간 지속적으로 체크.
    this.todayChecker();
  }

  /**
   * studyTime save
   * _CURRENTDAY = DB ojbect name
   */
  saveStudyTime() {
    const startTime = this.props.startTime;
    const endTime = this.props.endTime;

    if (startTime === '' && startTime === null) {
      alert('시작되지 않았습니다.');
    } else if (endTime === '' && endTime === null) {
      alert('종료되지 않았습니다.');
    } else {
      confirmAlert(
        confirmOption.saveStudiedTime(
          _CURRENTDAY,
          startTime,
          endTime,
          this.props.studyReset
        )
      );
    }
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
      confirmAlert(
        confirmOption.startConfirm(_CURRENTDAY, msgNameStart, studyStart)
      );
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
          <h1>{this.props.clockFormat.slice(0, 10)}</h1>
          <h2>{this.props.clockFormat.slice(10, 19)}</h2>
        </div>
        <div className="center-clock">
          <span>Start : </span> {this.props.startTime} <br />
          <span>End : </span> {this.props.endTime}
        </div>
        <div className="center-control">
          <button id="startBtn" onClick={this.confirmForAction}>
            Start
          </button>
          <button id="stopBtn" onClick={this.confirmForAction}>
            Stop
          </button>
          <button onClick={this.saveStudyTime}>Save</button>
          <button onClick={this.resetHandler}>Reset</button>
        </div>
      </div>
    );
  }
}

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;

export default Time;
