const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'share_your_thoughts'
});

function getConnection(callback) {
    pool.getConnection((err, connection) => {
        callback(err, connection);
    });
}

module.exports = { getConnection };
