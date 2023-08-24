import mysql from 'mysql2';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

// 접속
// connection.connect((error) => {
//   if (error) throw error;
//   console.log('Successfully connected to the database.');
// });

// connection.query('SELECT * from cust', (error, rows, fields) => {
//   if (error) throw error;
//   console.log('User info is: ', rows);
// });

// connection.end();

export default connection;
