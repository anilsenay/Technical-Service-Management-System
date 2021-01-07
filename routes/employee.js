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
        console.log(err);
        if(err.code === "ENOCONN")
          return res.status(503).send( { error: {err}})
        return res.status(400).send( { error: {err}})
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ employees: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get employee's all repairments information with given id, firstName and lastName parameters.
router.get("/repairments", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.TinyInt, req.query.id || "NULL");
    request.input("firstName", sql.NVarChar(50), req.query.firstName || "NULL");
    request.input("lastName", sql.NVarChar(50), req.query.lastName || "NULL");
    request.execute("sp_getEmployeeRepairments", (err, result) => {
      if (err) {
        console.log(err);
        if(err.code === "ENOCONN")
          return res.status(503).send( { error: {err}})
        return res.status(400).send( { error: {err}})
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ repairments: result.recordsets[0] });
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
          console.log(err);
          if(err.code === "ENOCONN")
            return res.status(503).send( { error: {err}})
          return res.status(400).send( { error: {err}})
        }

        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.status(200).send({ employee: recordsets.recordset }); // Result in JSON format
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
      if (err) {
        console.log(err);
        if(err.code === "ENOCONN")
          return res.status(503).send( { error: {err}})
        return res.status(400).send( { error: {err}})
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ availibilities: result.recordsets[0] });
    });
  });
});

module.exports = router;
