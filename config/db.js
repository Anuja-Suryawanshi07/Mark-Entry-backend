// const mysql = require("mysql2");
// const {HOST, USERNAME, PASSWORD, DATABASE, DB_PORT} = require(".");
// const pool = mysql.createPool({
//   host: HOST,
//   port:DB_PORT,
//   user: USERNAME,
//   password: PASSWORD,
//   database: DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0,
//     ssl: HOST.includes("localhost")?undefined:{ rejectUnauthorized: true } // Add this line for secure connection
// });

// module.exports = pool;
// db.js
const mysql = require('mysql2'); // use promise wrapper
const fs = require('fs');
//const { HOST, USERNAME, PASSWORD, DATABASE, PORT, DB_PORT } = require('../config');

const HOST = process.env.DB_HOST;
const USERNAME = process.env.DB_USER ; 
const PASSWORD = process.env.PASSWORD ;
const DATABASE = process.env.DATABASE ;
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

  ssl: HOST.includes("localhost")?undefined:{ rejectUnauthorized: true } 
  // ssl: {

    
  //   //ca: fs.readFileSync(__dirname +'/ca.pem')

  // }
});

module.exports = pool;
