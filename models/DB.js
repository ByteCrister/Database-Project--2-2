const mysql = require('mysql2');

const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pc_gallery'
});

module.exports =  dataBase ;
