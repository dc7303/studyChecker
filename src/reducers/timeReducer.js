import * as types from '../action/actionTypes';
import clock from '../js/clock';

const initialState = {
  clockFormat: clock()
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
        clockFormat: state.clockFormat
      };

    default:
      return state;
  }
}
