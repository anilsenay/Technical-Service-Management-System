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
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ employees: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get all employee availabilities
router.get("/availabilities", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM dbo.[EMPLOYEE_AVAILABILITY]",
      (err, recordsets) => {
        if (err) {
          console.log(err);
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res.status(400).send({ error: { err } });
        }

        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.status(200).send({ availabilities: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

// Get employee's all repairments information with given id, firstName and lastName parameters.
router.get("/repairments", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.TinyInt, req.query.id || null);
    request.input("firstName", sql.NVarChar(50), req.query.firstName || null);
    request.input("lastName", sql.NVarChar(50), req.query.lastName || null);
    request.execute("sp_getEmployeeRepairments", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ repairments: result.recordsets[0] });
    });
  });
});

// Get average repairment duration per employee.
router.get("/repairments/durations", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.execute("sp_getAvgRepairmentDurationPerEmployee", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ durations: result.recordsets[0] });
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
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res.status(400).send({ error: { err } });
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
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ availibilities: result.recordsets[0] });
    });
  });
});

// Get detailed repairments.
router.get("/getDetailedRepairment/:employeeID", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("employeeID", sql.TinyInt, req.params.employeeID);
    request.execute("sp_getDetailedRepairmentEmployee", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();

      const allJson = result.recordset.map((item) => {
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
      return res.status(200).send({ detailedRepairment: allJson || null });
    });
  });
});

// Insert a new employee availability.
router.post("/availability/insert/", (req, res) => {
  var employeeID = req.body.employeeID;
  var monday = req.body.monday;
  var tuesday = req.body.tuesday;
  var wednesday = req.body.wednesday;
  var thursday = req.body.thursday;
  var friday = req.body.friday;
  var saturday = req.body.saturday;
  var startHour = req.body.startHour;
  var endHour = req.body.endHour;
  var startDate = new Date(`01/01/1970 ${startHour} GMT-0000`);
  var endDate = new Date(`01/01/1970 ${endHour} GMT-0000`);
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("employeeID", sql.TinyInt, employeeID || null);
    request.input("monday", sql.Bit, monday || 0);
    request.input("tuesday", sql.Bit, tuesday || 0);
    request.input("wednesday", sql.Bit, wednesday || 0);
    request.input("thursday", sql.Bit, thursday || 0);
    request.input("friday", sql.Bit, friday || 0);
    request.input("saturday", sql.Bit, saturday || 0);
    request.input("startHour", sql.Time, startDate || null);
    request.input("endHour", sql.Time, endDate || null);
    request.execute("sp_InsertNewEmployeeAvailability", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ newAvailability: { ...req.body } });
    });
  });
});

// Update the employee's password.
router.put("/updatePassword", (req, res) => {
  var username = req.body.username;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("username", sql.NVarChar(30), username || null);
    request.input("oldPassword", sql.NVarChar(32), oldPassword || null);
    request.input("newPassword", sql.NVarChar(32), newPassword || null);
    request.execute("sp_updatePassword", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ newPassword: result.recordsets });
    });
  });
});

// Update the employee's information.
router.put("/update", (req, res) => {
  var username = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("username", sql.NVarChar(30), username || null);
    request.input("firstName", sql.NVarChar(50), firstName || null);
    request.input("lastName", sql.NVarChar(50), lastName || null);
    request.input("email", sql.NVarChar(100), email || null);
    request.input("phoneNumber", sql.NVarChar(50), phoneNumber || null);
    request.execute("sp_updateEmployee", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ updatedEmployee: { ...req.body } });
    });
  });
});

// Delete employee with given employeeID
router.delete("/delete/:employeeID", (req, res) => {
  var employeeID = req.params.employeeID;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("employeeIDtoBeDeleted", sql.TinyInt, employeeID || null);
    request.execute("sp_deleteEmployee", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ deletedEmployee: { ...req.params } });
    });
  });
});

// Insert a new employee.
router.post("/insert", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phoneNumber = req.body.phoneNumber;
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var address = req.body.address;
  var dateOfBirth = req.body.dateOfBirth;
  var startDate = req.body.startDate;
  var type = req.body.type;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("firstName", sql.NVarChar(50), firstName || null);
    request.input("lastName", sql.NVarChar(50), lastName || null);
    request.input("phoneNumber", sql.NVarChar(20), phoneNumber || null);
    request.input("username", sql.NVarChar(30), username || null);
    request.input("password", sql.NVarChar(32), password || null);
    request.input("email", sql.NVarChar(100), email || null);
    request.input("address", sql.NVarChar(150), address || null);
    request.input("dateOfBirth", sql.Date, dateOfBirth || null);
    request.input("startDate", sql.Date, startDate || null);
    request.input("type", sql.NVarChar(32), type || null);
    request.execute("sp_insertNewEmployee", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ newEmployee: { ...req.body } });
    });
  });
});

module.exports = router;
