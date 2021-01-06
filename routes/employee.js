var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all employees.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query("SELECT * FROM EMPLOYEE", (err, recordsets) => {
      if (err) {
        throw err;
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.send({ employees: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get employees with given employeeId.
router.get("/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM EMPLOYEE WHERE ID=" + req.params.id,
      (err, recordsets) => {
        if (err) {
          throw err;
        }
        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.send({ employee: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

// Get the employee availability with given employeeID.
router.get("/availability/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.Int, req.params.id);
    request.input("fName", sql.NVarChar(50), "");
    request.input("lName", sql.NVarChar(50), "");
    request.execute("sp_getEmployeeAvailability", (err, result) => {
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.send({ availibilities: result.recordsets[0] });
    });
  });
});

module.exports = router;
