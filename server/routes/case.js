var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all cases.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query("SELECT * FROM dbo.[CASE]", (err, recordsets) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ cases: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get all case type/category/specs.
router.get("/info", (req, res) => {
  var types = null;
  var categories = null;
  var specifications = null;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query("SELECT * FROM dbo.[CASE_TYPE]", (err, recordsets) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }
      types = recordsets.recordset;
      request.query("SELECT * FROM dbo.[CASE_CATEGORY]", (err, recordsets) => {
        if (err) {
          console.log(err);
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res.status(400).send({ error: { err } });
        }
        categories = recordsets.recordset;
        request.query("SELECT * FROM dbo.[CASE_SPECIFICATION]", (err, recordsets) => {
          if (err) {
            console.log(err);
            if (err.code === "ENOCONN")
              return res.status(503).send({ error: { err } });
            return res.status(400).send({ error: { err } });
          }

          res.setHeader("Content-Type", "application/json");
          sql.close();
          return res.status(200).send({ types, categories, specifications: recordsets.recordset }); // Result in JSON format
        });
      });
    });
  });
});

// Update the case.
router.put("/update", (req, res) => {
  var caseID = req.body.caseID;
  var caseType = req.body.caseType;
  var caseCategory = req.body.caseCategory;
  var caseSpec = req.body.caseSpec;
  var caseDesc = req.body.caseDesc;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("caseID", sql.Int, caseID || null);
    request.input("caseType", sql.TinyInt, caseType || null);
    request.input("caseCategory", sql.TinyInt, caseCategory || null);
    request.input("caseSpec", sql.TinyInt, caseSpec || null);
    request.input("caseDesc", sql.NVarChar(100), caseDesc || "NULL");
    request.execute("sp_updateCase", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ updatedCase: { ...req.body } });
    });
  });
});

// Insert a new case.
router.post("/insert", (req, res) => {
  var caseType = req.body.caseType;
  var caseCategory = req.body.caseCategory;
  var caseSpec = req.body.caseSpec;
  var caseDesc = req.body.caseDesc;

  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("caseType", sql.TinyInt, caseType || null);
    request.input("caseCategory", sql.TinyInt, caseCategory || null);
    request.input("caseSpec", sql.TinyInt, caseSpec || null);
    request.input("caseDesc", sql.NVarChar(100), caseDesc || "NULL");
    request.execute("sp_insertNewCase", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ newCase: { ...req.body } });
    });
  });
});

module.exports = router;
