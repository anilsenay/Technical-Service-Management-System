var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all payments.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      `SELECT p.*, e.firstName + ' ' + e.lastName accountantName, pm.paymentMethod methodName 
       FROM PAYMENT p inner join EMPLOYEE e on p.accountantID=e.ID 
                      inner join PAYMENT_METHOD pm on p.paymentMethod=pm.ID`,
      (err, recordsets) => {
        if (err) {
          console.log(err);
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res.status(400).send({ error: { err } });
        }

        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.status(200).send({ payments: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

// Insert a new payment.
router.post("/insert", (req, res) => {
  var repairmentID = req.body.repairmentID;
  var accountantID = req.body.accountantID;
  var totalCost = req.body.totalCost;
  var paymentMethod = req.body.paymentMethod;

  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("repairmentID", sql.Int, repairmentID || null);
    request.input("accountantID", sql.TinyInt, accountantID || null);
    request.input("totalCost", sql.SmallMoney, totalCost || null);
    request.input("paymentMethod", sql.TinyInt, paymentMethod || null);
    request.execute("sp_insertNewPayment", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ newPayment: { ...req.body } });
    });
  });
});

// Delete a new payment.
router.delete("/delete/:paymentID", (req, res) => {
  var paymentID = req.params.paymentID;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("paymentID", sql.Int, paymentID || null);
    request.execute("sp_deletePayment", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ deletedPayment: { ...req.params } });
    });
  });
});
module.exports = router;
