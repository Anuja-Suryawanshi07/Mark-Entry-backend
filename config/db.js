// db.js
const mysql = require('mysql2'); // use promise wrapper
const fs = require('fs');


const HOST = process.env.DB_HOST;
const USERNAME = process.env.DB_USERNAME ; 
const PASSWORD = process.env.DB_PASSWORD ;
const DATABASE = process.env.DB_NAME ;
const PORT = process.env.PORT || 7777;
const DB_PORT = process.env.DB_PORT || 4000;


const pool = mysql.createPool({
  host: HOST,
  port: DB_PORT,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: HOST.includes("localhost")?undefined:{ rejectUnauthorized: true } // Add this line for secure connection
  // ssl: {

    
  //   //ca: fs.readFileSync(__dirname +'/ca.pem')

  // }
});

module.exports = pool;
