const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db_data/db.json');
const db = low(adapter);

const shortid = require('shortid');

db.defaults({ data: [] }).write();

const generateId = shortid.generate();

export default db;
