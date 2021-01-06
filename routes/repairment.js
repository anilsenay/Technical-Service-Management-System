var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all employees.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query("SELECT * FROM REPAIRMENT", (err, recordsets) => {
      if (err) {
        throw err;
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.send({ repairments: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get employees with given employeeId.
router.get("/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM REPAIRMENT WHERE ID=" + req.params.id,
      (err, recordsets) => {
        if (err) {
          throw err;
        }
        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.send({ repairment: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

// Get the repairment's related information with given id parameter.
router.get("/info/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.Int, req.params.id);
    request.execute("sp_getRepairmentInfo", (err, result) => {
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.send({ information: result.recordsets[0] });
    });
  });
});

// Get the repairment's cost information with given id parameter.
router.get("/cost/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.Int, req.params.id);
    request.execute("sp_getRepairmentCost", (err, result) => {
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.send({ cost: result.recordsets[0] });
    });
  });
});

module.exports = router;
