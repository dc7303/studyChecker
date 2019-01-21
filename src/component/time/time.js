import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const defaultFuncProps = funcName => {
  return () => console.log(`${funcName} undefined`);
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

/**
 * Component
 */
class Time extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.timeHandler = this.timeHandler.bind(this);
    this.confirmForAction = this.confirmForAction.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

  timeHandler() {
    setInterval(this.props.clockHandler, 1000);
  }

  /*
    Clock on
   */
  componentWillMount() {
    this.timeHandler();
  }

  /*
    react-confirm-alert()
   */
  confirmForAction(event) {
    const studyStart = this.props.studyStart;
    const studyStop = this.props.studyStop;
    const msgNameStart = '시작';
    const msgNameStop = '중지';
    const targetId = event.target.id;
    //react-confirm-alert option
    const confirmOption = (msgName, action) => {
      let resultMsg = '';
      if (msgName === msgNameStop) {
        resultMsg = `${msgNameStop}하시겠습니까? 중지할 시 학습 시간이 기록이 반영되어 수정할 수 없습니다.`;
      } else if (msgName === msgNameStart) {
        resultMsg = `${msgNameStart}하시겠습니까?`;
      }

      return {
        title: 'Confirm',
        message: resultMsg,
        buttons: [
          {
            label: 'Yes',
            onClick: action
          },
          {
            label: 'No',
            onClick: () => {
              return;
            }
          }
        ]
      };
    };

    //event select
    if (targetId === 'startBtn') {
      confirmAlert(confirmOption(msgNameStart, studyStart));
    } else if (targetId === 'stopBtn') {
      if (this.props.startTime !== '' && this.props.startTime !== null) {
        confirmAlert(confirmOption(msgNameStop, studyStop));
      } else {
        alert('start 후 사용가능합니다.');
      }
    }
  }

  resetHandler() {
    const studyReset = this.props.studyReset;
    confirmAlert({
      title: 'Confirm',
      message: '초기화하시겠습니까? 초기화시 복구할 수 없습니다.',
      buttons: [
        {
          label: 'Yes',
          onClick: studyReset
        },
        {
          label: 'No',
          onClick: () => {
            return;
          }
        }
      ]
    });
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
