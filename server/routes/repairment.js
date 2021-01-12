var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all repairments.
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
// Get detailed repairments.
router.get("/getDetailedRepairment/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.Int, req.params.id);
    request.execute("sp_getDetailedRepairment", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();
      const item = result.recordsets[0][0];
      const allJson = {
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
          pyhsicalCondition: item.pyhsicalCondition,
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
      return res.status(200).send({ detailedRepairment: allJson });
    });
  });
});

// Get repairments with given repairmentID.
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

// Update the repairment's information.
router.put("/update", (req, res) => {
  var repairmentID = req.body.repairmentID;
  var employeeID = req.body.employeeID;
  var isInWarranty = req.body.isInWarranty;
  var remark = req.body.remark;
  var partIDNeedChange = req.body.partIDNeedChange;
  var value = req.body.value;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("repairmentID", sql.Int, repairmentID || null);
    request.input("employeeID", sql.TinyInt, employeeID || null);
    request.input("isInWarranty", sql.Bit, isInWarranty || null);
    request.input("remark", sql.NVarChar(100), remark || "NULL");
    request.input("partIDNeedChange", sql.BigInt, partIDNeedChange || null);
    request.input("value", sql.TinyInt, value || null);
    request.execute("sp_updateRepairment", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ updatedRepairment: { ...req.body } });
    });
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
  var caseID = req.body.caseID;
  var employeeID = req.body.employeeID;
  var isInWarranty = req.body.isInWarranty;
  var remark = req.body.remark;
  var value = req.body.value;
  //Customer Device
  var deviceID = req.body.deviceID;
  var customerId = req.body.customerId;
  var model = req.body.model;
  var colorCode = req.body.colorCode;
  var serialCode = req.body.serialCode;
  var warrantyDueDate = req.body.warrantyDueDate;
  var physicalCondition = req.body.physicalCondition;
  var proofOfPurchase = req.body.proofOfPurchase;
  //Customer
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phoneNumber = req.body.phoneNumber;
  var streetName = req.body.streetName;
  var streetNumber = req.body.streetNumber;
  var city = req.body.city;
  var county = req.body.county;
  var zipcode = req.body.zipcode;
  // Case
  var caseType = req.body.caseType;
  var caseCategory = req.body.caseCategory;
  var caseSpec = req.body.caseSpec;
  var caseDesc = req.body.caseDesc;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("caseID", sql.Int, caseID || null);
    request.input("employeeID", sql.TinyInt, employeeID || null);
    request.input("isInWarranty", sql.Bit, isInWarranty || null);
    request.input("remark", sql.NVarChar(100), remark || "NULL");
    request.input("value", sql.TinyInt, value || null);
    //Customer Device
    request.input("deviceID", sql.BigInt, deviceID || null);
    request.input("customerId", sql.Int, customerId || null);
    request.input("model", sql.NVarChar(20), model || "NULL");
    request.input("colorCode", sql.NVarChar(10), colorCode || "NULL");
    request.input("serialCode", sql.NVarChar(15), serialCode || "NULL");
    request.input("warrantyDueDate", sql.Date, warrantyDueDate || null);
    request.input(
      "pyhsicalCondition",
      sql.NVarChar(100),
      physicalCondition || "NULL"
    );
    request.input("proofOfPurchase", sql.Bit, proofOfPurchase || null);
    // Customer
    request.input("firstName", sql.NVarChar(50), firstName || "NULL");
    request.input("lastName", sql.NVarChar(50), lastName || "NULL");
    request.input("phoneNumber", sql.NVarChar(20), phoneNumber || "NULL");
    request.input("streetName", sql.NVarChar(50), streetName || "NULL");
    request.input("streetNumber", sql.NVarChar(50), streetNumber || "NULL");
    request.input("city", sql.NVarChar(50), city || "NULL");
    request.input("county", sql.NVarChar(50), county || "NULL");
    //Case
    request.input("caseType", sql.TinyInt, caseType || null);
    request.input("caseCategory", sql.TinyInt, caseCategory || null);
    request.input("caseSpec", sql.TinyInt, caseSpec || null);
    request.input("caseDesc", sql.TinyInt, caseDesc || null);
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
