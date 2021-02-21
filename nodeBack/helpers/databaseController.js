const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    min: 1,
    ssl: {
        rejectUnauthorized: false
    }
});

const getClient = async () => {
  return await pool.connect();
}

module.exports = {
  getClient
}