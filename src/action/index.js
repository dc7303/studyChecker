import * as types from './actionTypes';

export function clockStart() {
  return {
    type: types.CLOCK_START
  };
}

export function studyStart() {
  return {
    type: types.STUDY_START
  };
}

export function studyStop() {
  return {
    type: types.STUDY_STOP
  };
}

export function studyReset() {
  return {
    type: types.STUDY_RESET
  };
}
