import mysql from 'mysql';
import {promisify} from 'util';
import database from './config';


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
          }
          if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
          }
          if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
          }
    }
    if(connection) connection.release();
    console.log('Base de datos conectada en el puerto ' + database.port );
    return;
});

pool.query= promisify(pool.query);
module.exports = pool;