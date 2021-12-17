const bodyParser = require("body-parser");
const client = require('./config/connection.js')
const express = require('express');
const cors = require("cors");

function service(){



const app = express();

client.connect();


app.use(cors());
app.use(bodyParser.json());


app.post("/api/v1/servicelist", (req, res) => {


  const { version, env, service, status } = req.body;

 client.query(
    "INSERT INTO details (version, env, service, status) VALUES ($1, $2, $3, $4) Returning *",
    [version, env, service, status],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.sendStatus(201);
    }
  );
 
});

app.get("/api/v1/servicelist", (req, res) => {
  client.query(
    "SELECT version, env, service, status FROM details",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});


app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

}
module.exports = service;
