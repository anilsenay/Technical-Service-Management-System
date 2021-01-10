var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all information from storage.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query("SELECT * FROM STORAGE", (err, recordsets) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ storage: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get part's quantity info with given quantity parameter.
router.get("/parts/:lessThan", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("lessThan", sql.Int, req.params.lessThan);
    request.execute("sp_getPartsLessThanInStorage", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ parts: result.recordsets });
    });
  });
});

module.exports = router;
