const Pool = require('pg').Pool;

const client = new Pool({
   host: "localhost",
   user: "postgres",
   port: 5432,
   database: "health",
   password: "postgres"    
})

module.exports = client
