const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    password: process.env.PGPASSWORD
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