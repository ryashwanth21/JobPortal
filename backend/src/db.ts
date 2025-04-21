// src/db.ts
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',# Have ur password
  database: 'job_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
console.log("Connected to MySQL Database")
