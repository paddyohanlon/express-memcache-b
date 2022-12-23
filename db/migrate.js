const db = require('../db');

/**
 * Run database migrations
 */
module.exports = async function () {
  console.log('Run migrations');

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS likes (
        n INT PRIMARY KEY,
        likes INT NOT NULL
      )
    `);
  } catch (err) {
    console.log(err.message);
  }
};
