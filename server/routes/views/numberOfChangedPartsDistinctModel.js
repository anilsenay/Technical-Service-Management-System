var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../../config");

// Get number of changed parts per distinct model.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM view_numberOfChangedPartsDistinctModel",
      (err, recordsets) => {
        if (err) {
          console.log(err);
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res.status(400).send({ error: { err } });
        }

        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.status(200).send({ changedParts: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

module.exports = router;
