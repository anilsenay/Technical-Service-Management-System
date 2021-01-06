const sql = require("mssql");
const express = require("express");
const bodyParser = require("body-parser");
const sqlConfig = require("./config");

var employees = require("./routes/employee");
var customers = require("./routes/customer");
var repairments = require("./routes/repairment");

const PORT = 5000 || process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/employee", employees);
app.use("/api/customer", customers);
app.use("/api/repairment", repairments);

app.listen(PORT, () => {
  console.log("Working on port : " + PORT);
});
