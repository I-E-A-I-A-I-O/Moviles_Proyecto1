const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, (err, res) => {
      callback(err, res);
    })
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      return callback(err, client, done);
    })
  }
}