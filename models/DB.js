const mysql = require('mysql2');
require('dotenv').config();

const dataBase = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB,
    port: process.env.PORT,
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000, // 10 seconds
    timeout: 60000
});

dataBase.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Connected to MySQL Database!");
  });

module.exports =  dataBase ;
