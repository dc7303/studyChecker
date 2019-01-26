import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import msToTime from '../js/msToTime';

const adapter = new FileSync('db_data/db.json');
const db = low(adapter);

/**
 * study start 이벤트 발생 때
 * 해당 날짜에 대한 collection 존재하지 않을 경우
 * 셋팅해주는 Query
 *
 * @param {string} currentDay
 */
const setCollection = currentDay => {
  db.set(currentDay, {
    startTime: [],
    endTime: [],
    studiedTime: [],
    restTime: [],
    totalTime: []
  }).write();
};

/**
 * 학습시간 DB Insert
 * msToTime module 사용하여 start시간과 end시간 범위를 구해준다.
 *
 * @param {string} currentDay
 * @param {string} startTime
 * @param {string} endTime
 */
const insertStudyTime = (currentDay, startTime, endTime) => {
  const startDate = new Date(startTime).getTime();
  const endDate = new Date(endTime).getTime();

  const studiedTime = msToTime(endDate - startDate);

  //시작시간 저장
  db.get(`${currentDay}.startTime`)
    .push(startTime)
    .write();

  //종료시간 저장
  db.get(`${currentDay}.endTime`)
    .push(endTime)
    .write();

  //공부 한 시간
  db.get(`${currentDay}.studiedTime`)
    .push(studiedTime)
    .write();
};

const getStudiedAndRest = currentDay => {
  const currentObj = db.get(currentDay).value();

  const studiedData = currentObj.studiedTime;
  const restData = currentObj.restTime;

  return {
    studiedData,
    restData
  };
};

const DBHandler = {
  db,
  insertStudyTime,
  setCollection,
  getStudiedAndRest
};

export default DBHandler;
