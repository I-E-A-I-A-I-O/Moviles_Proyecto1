const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    min: 1,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("error", (error, client) => {
  console.log(error.message);
})

const getClient = async () => {
  return await pool.connect();
}

module.exports = {
  getClient
}