const mysql = require("mysql2");
const {HOST, USERNAME, PASSWORD, DATABASE, DB_PORT} = require(".");
const pool = mysql.createPool({
  host: HOST,
  port:DB_PORT,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
    ssl: HOST.includes("localhost")?undefined:{ rejectUnauthorized: true } // Add this line for secure connection
});

module.exports = pool;
