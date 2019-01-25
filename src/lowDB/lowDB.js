import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
const adapter = new FileSync('db_data/db.json');
const db = low(adapter);

const setCollection = currentDay => {
  db.set(currentDay, {
    startTime: [],
    endTime: [],
    studiedTime: [],
    restTime: [],
    totalTime: []
  }).write();
};

const insertStudyTime = (currentDay, startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

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
    .push(endTime)
    .write();
};

const DBHandler = {
  db,
  insertStudyTime,
  setCollection
};

export default DBHandler;
