if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log("process.env", process.env);

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV !== 'production' ? false : {
    rejectUnauthorized: false,
    ca: process.env.CA_CERT
  }
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}