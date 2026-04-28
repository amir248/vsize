require('dotenv').config();
// db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,    // IP или домен сервера PostgreSQL
  user: process.env.DB_USER,            // пользователь
  password: process.env.DB_PASSWORD,   // пароль 
  database: process.env.DB_NAME,     // название базы
  port: 5432                 // порт PostgreSQL
});

module.exports = pool;