var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../../config");

// Get all detailed information from order.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(`SELECT * from view_getDetailedOrders`, (err, recordsets) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      const allJson = recordsets.recordset.map((item) => {
        return {
          orderID: item.orderID,
          totalCost: item.totalCost,
          orderDate: item.orderDate,
          isConfirmed: item.isConfirmed,
          isInWarranty: item.isInWarranty,
          employee: {
            employeeID: item.ID,
            firstName: item.firstName,
            lastName: item.lastName,
            username: item.username,
            email: item.email,
            isManager: item.isManager,
            isSmartService: item.isSmartService,
            isTechnician: item.isTechnician,
            isStorageMan: item.isStorageMan,
            isTester: item.isTester,
            isAccountant: item.isAccountant,
          },
        };
      });
      return res.status(200).send({ detailedOrders: allJson }); // Result in JSON format
    });
  });
});

module.exports = router;
