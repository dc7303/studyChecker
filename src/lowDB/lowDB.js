import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import timeModule from '../js/timeModule';

const adapter = new FileSync('db_data/db.json');
export const db = low(adapter);

/**
 * study start 이벤트 발생 때
 * 해당 날짜에 대한 collection 존재하지 않을 경우
 * 셋팅해주는 Query
 *
 * @param {string} currentDay
 */
export const setCollection = currentDay => {
  db.set(currentDay, {
    startTime: [],
    endTime: [],
    studiedTime: [],
    restTime: [],
    totalTime: ''
  }).write();
};

/**
 * 학습시간 DB Insert
 * timeModule.msToTime module 사용하여 start시간과 end시간 범위를 구해준다.
 *
 * @param {string} currentDay
 * @param {string} startTime
 * @param {string} endTime
 */
export const insertStudyTime = (currentDay, startTime, endTime) => {
  const studiedTime = timeModule.getElapsedTime(endTime, startTime);

  //이전에 저장한 값이 있는 경우 이전 endTime과 계산해서 쉬는시간 출력
  setRestTime(currentDay, startTime);

  //시작시간 저장
  db.get(`${currentDay}.startTime`)
    .push(startTime)
    .write();

  //종료시간 저장
  db.get(`${currentDay}.endTime`)
    .push(endTime)
    .write();

  //공부한 시간
  db.get(`${currentDay}.studiedTime`)
    .push(studiedTime)
    .write();

  //총 공부한 시간 저장
  setTotalTime(currentDay, db.get(`${currentDay}.studiedTime`).value());
};

/**
 * 이전에 시작시간 있는 경우 쉬는 시간 계산해서 저장해주는 로직
 *
 * @param {string} currentDay
 * @param {string} startTime
 */
export const setRestTime = (currentDay, startTime) => {
  const endSize = db
    .get(`${currentDay}.endTime`)
    .size()
    .value();

  if (endSize > 0) {
    const endTime = db.get(`${currentDay}.endTime[${endSize - 1}]`).value();

    const restTime = timeModule.getElapsedTime(startTime, endTime);
    db.get(`${currentDay}.restTime`)
      .push(restTime)
      .write();
  } else {
    return;
  }
};

/**
 * 총 공부한 시간 셋팅
 *
 * @param {string} currentDay
 */
export const setTotalTime = (currentDay, studied) => {
  //총 공부한 시간 element remove
  db.update(`${currentDay}.totalTime`, n =>
    timeModule.sumTimes(studied)
  ).write();
};

/**
 * studied, rest, total 가져오는 메소드
 *
 * @param {string} currentDay
 * @returns {Object}
 */
export const getStudiedAndRest = currentDay => {
  const currentObj = db.get(currentDay).value();

  if (currentObj === undefined) {
    return undefined;
  }

  const studiedData = currentObj.studiedTime;
  const restData = currentObj.restTime;
  const totalData = currentObj.totalTime;

  return {
    studiedData,
    restData,
    totalData
  };
};

/**
 * get calendar chart data
 *
 * @param {Array} option
 */
export const getCalendarChartData = (currentDay, option) => {
  const allObj = db.value();
  const resultArr = [option];

  for (let prop in allObj) {
    const searchYear = String(prop).slice(0, 4);
    const currentYear = String(currentDay).slice(0, 4);

    if (searchYear === currentYear) {
      const replaceStr = allObj[prop].totalTime.replace(/:/g, '');
      const value = parseInt(replaceStr);
      resultArr.push([new Date(prop), value]);
    }
  }

  return resultArr;
};

const DBHandler = {
  db,
  insertStudyTime,
  setCollection,
  getStudiedAndRest,
  getCalendarChartData
};

export default DBHandler;
