import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '34.210.12.165',
    user: 'admin',
    password: 'SweTE@m05',
    queueLimit: 0,
    connectionLimit: 20,
    waitForConnections: true,
    database: 'GatorTrader'
});

const promisePool = pool.promise();

export default promisePool;