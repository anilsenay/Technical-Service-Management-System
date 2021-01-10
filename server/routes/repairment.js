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
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ repairments: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get paid repairments.
router.get("/paid", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.execute("sp_getPaidRepairments", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ paidRepairments: result.recordsets[0] });
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
          console.log(err);
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res.status(400).send({ error: { err } });
        }

        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.status(200).send({ repairment: recordsets.recordset }); // Result in JSON format
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
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ information: result.recordsets[0] });
    });
  });
});

// Get the repairment's cost information with given id parameter.
router.get("/cost/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.Int, req.params.id);
    request.execute("sp_getRepairmentCost", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ cost: result.recordsets[0] });
    });
  });
});

// Insert a new repairment.all
router.post("/insert", (req, res) => {
  var deviceID = req.body.deviceID;
  var caseID = req.body.caseID;
  var customerID = req.body.customerID;
  var employeeID = req.body.employeeID;
  var isInWarranty = req.body.isInWarranty;
  var remark = req.body.remark;
  var value = req.body.value;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("deviceID", sql.BigInt, deviceID || "NULL");
    request.input("caseID", sql.Int, caseID || "NULL");
    request.input("customerID", sql.Int, customerID || "NULL");
    request.input("employeeID", sql.TinyInt, employeeID || "NULL");
    request.input("isInWarranty", sql.Bit, isInWarranty || "NULL");
    request.input("remark", sql.NVarChar(100), remark || "NULL");
    request.input("value", sql.TinyInt, value || "NULL");
    request.execute("sp_insertNewRepairment", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ repairment: { ...req.body } });
    });
  });
});

module.exports = router;
