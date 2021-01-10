var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all customer devices.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query("SELECT * FROM CUSTOMER_DEVICE", (err, recordsets) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ devices: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get most frequent repaired model.
router.get("/mostRepaired", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.execute("sp_getMostFrequentRepairedModel", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ mostRepairedModel: result.recordsets[0] });
    });
  });
});
module.exports = router;

// Get the device's repairments with given deviceID.
router.get("/repairments/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.BigInt, req.params.id);
    request.execute("sp_getDeviceRepairments", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ deviceRepairment: result.recordset });
    });
  });
});

module.exports = router;
