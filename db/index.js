if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log("process.env", process.env);

const { Pool } = require('pg');

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV !== 'production' ? false : {
    rejectUnauthorized: true,
    ca: process.env.DB_CA_CERT
  }
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}