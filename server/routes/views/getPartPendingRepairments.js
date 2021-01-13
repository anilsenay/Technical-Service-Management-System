var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../../config");

// Get part's pending repairments.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM view_getPartPendingRepairments",
      (err, recordsets) => {
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
            ID: item.ID,
            repairmentStartDate: item.repairmentStartDate,
            repairmentEndDate: item.repairmentEndDate,
            isPartWaited: item.isPartWaited,
            isInWarranty: item.isInWarranty,
            remark: item.remark,
            repairmentDuration: item.repairmentDuration,
            device: {
              deviceID: item.deviceID,
              model: item.model,
              colorCode: item.colorCode,
              serialCode: item.serialCode,
              warrantyDueDate: item.warrantyDueDate,
              warranty: item.warranty,
              physicalCondition: item.physicalCondition,
              proofOfPurchase: item.proofOfPurchase,
            },
            customer: {
              customerID: item.customerID,
              firstName: item.firstName,
              lastName: item.lastName,
            },
            case: {
              caseID: item.caseID,
              caseType: item.caseType,
              caseCategory: item.caseCategory,
              caseSpecification: item.caseSpecification,
              caseDescription: item.caseDescription,
            },
            employee: {
              employeeID: item.employeeID,
              EmpfirstName: item.EmpfirstName,
              EmplastName: item.EmplastName,
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
        return res.status(200).send({ pendingRepairments: allJson || null }); // Result in JSON format
      }
    );
  });
});

module.exports = router;
