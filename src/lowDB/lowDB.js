const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db_data/db.json');
const db = low(adapter);

const shortid = require('shortid');

db.defaults({ data: [] }).write();

const generateId = shortid.generate();

db.get('data')
  .push({
    saveDate: '2018-01-21 12:00:00',
    studyTime: {
      startTime: [
        '2018-01-21 12:00:00',
        '2018-01-21 12:00:00',
        '2018-01-21 12:00:00'
      ],
      endTime: [
        '2018-01-21 12:00:00',
        '2018-01-21 12:00:00',
        '2018-01-21 12:00:00'
      ],
      restTime: ['12:00:00', '12:00:00']
    }
  })
  .write();
