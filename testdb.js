// testDb.js
const db = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT * FROM course;');
    console.log('Connection successful! Sample rows:', rows);
  } catch (err) {
    console.error('Error connecting to TiDB:', err);
  }
}

testConnection();
