import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
const adapter = new FileSync('db_data/db.json');
const db = low(adapter);

db.defaults({ data: [] }).write();

class DBHandler {
  constructor() {
    this.db = db;
  }

  insertStudyTime(saveDate, startTime, endTime, restTime) {
    db.get('data')
      .push({
        saveDate: saveDate,
        studyTime: {
          startTime: [startTime],
          endTime: [endTime],
          restTime: [restTime]
        }
      })
      .write();
  }
}

export default DBHandler;
