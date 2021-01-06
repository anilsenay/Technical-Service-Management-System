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
      return res.send({ customers: recordsets.recordset }); // Result in JSON format
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
        return res.send({ customer: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

// Get customer's all repairments information with given firstName, lastName and phoneNumber parameters.
router.get(
  encodeURI("/repairments/:firstName/:lastName/:phoneNumber"),
  (req, res) => {
    sql.connect(sqlConfig, () => {
      var request = new sql.Request();
      request.input("firstName", sql.NVarChar(50), req.params.firstName);
      request.input("lastName", sql.NVarChar(50), req.params.lastName);
      request.input("phoneNumber", sql.NVarChar(20), req.params.phoneNumber);
      request.execute("sp_getCustomerRepairments", (err, result) => {
        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.send({ repairments: result.recordsets[0] });
      });
    });
  }
);

module.exports = router;
