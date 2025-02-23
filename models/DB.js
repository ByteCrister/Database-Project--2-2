const mysql = require('mysql2');
require('dotenv').config();

const dataBase = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB,
    port: process.env.PORT
});

module.exports =  dataBase ;
