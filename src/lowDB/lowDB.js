const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db_data/db.json');
const db = low(adapter);

const shortid = require('shortid');

db.defaults({ topic: [], author: [], user: [] }).write();

const generateId = shortid.generate();

db.get('user')
  .push({ id: generateId, name: 'joo' })
  .write();
