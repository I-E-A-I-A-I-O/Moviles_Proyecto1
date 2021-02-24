const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false }
});

pool.on("error", (error, client) => {
  console.log(error);
})

const getClient = async () => {
  return await pool.connect();
}

module.exports = {
  getClient
}