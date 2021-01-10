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

// Get employee's all repairments information with given id, firstName and lastName parameters.
router.get("/repairments", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.TinyInt, req.query.id || "NULL");
    request.input("firstName", sql.NVarChar(50), req.query.firstName || "NULL");
    request.input("lastName", sql.NVarChar(50), req.query.lastName || "NULL");
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

// Update the employee's password.
router.put("/updatePassword", (req, res) => {
  var username = req.body.username;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newCustomer;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("username", sql.NVarChar(30), username || "NULL");
    request.input("oldPassword", sql.NVarChar(32), oldPassword || "NULL");
    request.input("newPassword", sql.NVarChar(32), newPassword || "NULL");
    request.execute("sp_updatePassword", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ newPassword: { ...req.body } });
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
    request.input("firstName", sql.NVarChar(50), firstName || "NULL");
    request.input("lastName", sql.NVarChar(50), lastName || "NULL");
    request.input("phoneNumber", sql.NVarChar(20), phoneNumber || "NULL");
    request.input("username", sql.NVarChar(30), username || "NULL");
    request.input("password", sql.NVarChar(32), password || "NULL");
    request.input("email", sql.NVarChar(100), email || "NULL");
    request.input("address", sql.NVarChar(150), address || "NULL");
    request.input("dateOfBirth", sql.Date, dateOfBirth || "NULL");
    request.input("startDate", sql.Date, startDate || "NULL");
    request.input("type", sql.NVarChar(32), type || "NULL");
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
