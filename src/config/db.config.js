import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

const pool = mysql.createPool(dbConfig);

export default pool;
