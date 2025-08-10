const mysql = require('mysql2');
require('dotenv').config();

const dataBase = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB,
    port: process.env.DB_port || 3306,
    connectTimeout: 10000 // 10s to connect
});

dataBase.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database!");
});

module.exports = dataBase;
