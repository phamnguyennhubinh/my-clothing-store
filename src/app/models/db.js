const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config.js");

// var connection =  mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });

// connection.connect(async(error) => {
//   if(error) throw error;
//   console.log("Successfully connected to the database");
// });

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

module.exports = pool;
// module.exports = connection;
