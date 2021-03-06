import * as types from '../action/actionTypes';
import clock from '../js/clock';

const initialState = {
  clockFormat: '',
  startTime: '',
  endTime: '',
  currentDay: ''
};

/**
 * clock handling reducer at layout center
 *
 * @param {*} state
 * @param {*} action
 */
export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case types.CLOCK_START:
      return {
        ...state,
        clockFormat: clock()
      };

    case types.STUDY_START:
      return {
        ...state,
        startTime: state.clockFormat
      };

    case types.STUDY_STOP:
      return {
        ...state,
        endTime: state.clockFormat
      };

    case types.STUDY_RESET:
      return {
        ...state,
        startTime: '',
        endTime: ''
      };

    case types.SET_CURRENT_DAY:
      return {
        ...state,
        currentDay: state.clockFormat.slice(0, 10)
      };

    default:
      return state;
  }
}
