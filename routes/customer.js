var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all customers.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    console.log(sqlConfig);
    request.query("SELECT * FROM CUSTOMER", (err, recordsets) => {
      if (err) {
        throw err;
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.send({ users: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get customer with given id.
router.get("/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM CUSTOMER WHERE ID=" + req.params.id,
      (err, recordsets) => {
        if (err) {
          throw err;
        }
        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.send({ users: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

module.exports = router;
