const bodyParser = require("body-parser");
const client = require('./config/connection.js')
const express = require('express');
var service = require('./service.js');
const cors = require("cors");

const app = express();
const path = require("path");
const jsonvalue ="";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

//for initiating DB connection 
client.connect();
service();

app.use(cors());
app.use(bodyParser.json());

//Code to get data from DB

app.get("/data", (req, res) => {
 client.query(
    "SELECT version, env, service, status FROM details",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }
     
  // json format output
  res.json(results.rows);
 }
  );
 
});

  
app.listen(8080)
console.log ("Server Running")