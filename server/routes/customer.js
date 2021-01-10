var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all customers.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query("SELECT * FROM CUSTOMER", (err, recordsets) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ customers: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Get customer's all repairments information with given firstName, lastName and phoneNumber parameters.
router.get("/repairments", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("firstName", sql.NVarChar(50), req.query.firstName || "NULL");
    request.input("lastName", sql.NVarChar(50), req.query.lastName || "NULL");
    request.input(
      "phoneNumber",
      sql.NVarChar(20),
      "+" + req.query.phoneNumber || "NULL"
    );
    request.execute("sp_getCustomerRepairments", (err, result) => {
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

// Insert a new customer.
router.post("/insert", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phoneNumber = req.body.phoneNumber;
  var streetName = req.body.streetName;
  var streetNumber = req.body.streetNumber;
  var city = req.body.city;
  var county = req.body.county;
  var zipcode = req.body.zipcode;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("firstName", sql.NVarChar(50), firstName || "NULL");
    request.input("lastName", sql.NVarChar(50), lastName || "NULL");
    request.input("phoneNumber", sql.NVarChar(20), phoneNumber || "NULL");
    request.input("streetName", sql.NVarChar(50), streetName || "NULL");
    request.input("streetNumber", sql.NVarChar(50), streetNumber || "NULL");
    request.input("city", sql.NVarChar(50), city || "NULL");
    request.input("county", sql.NVarChar(50), county || "NULL");
    request.input("zipcode", sql.NVarChar(10), zipcode || "NULL");
    request.execute("sp_insertNewCustomer", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ newCustomer: { ...req.body } });
    });
  });
});

// Update the customer information.
router.put("/update", (req, res) => {
  var id = req.body.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phoneNumber = req.body.phoneNumber;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.Int, id || null);
    request.input("firstName", sql.NVarChar(50), firstName || "NULL");
    request.input("lastName", sql.NVarChar(50), lastName || "NULL");
    request.input("phoneNumber", sql.NVarChar(20), phoneNumber || "NULL");
    request.execute("sp_updateCustomer", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ updatedCustomer: { ...req.body } });
    });
  });
});

// Delete the customer.
router.delete("/delete", (req, res) => {
  var id = req.body.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.Int, id || null);
    request.input("firstName", sql.NVarChar(50), firstName || "NULL");
    request.input("lastName", sql.NVarChar(50), lastName || "NULL");
    request.execute("sp_deleteCustomer", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ deletedCustomer: { ...req.body } });
    });
  });
});

// Delete the customer address.
router.delete("/deleteAdress/:id", (req, res) => {
  var id = req.params.id;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("id", sql.Int, id || null);
    request.execute("sp_deleteAddress", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ deletedAddress: { ...req.body } });
    });
  });
});

// Get customer with given id.
router.get("/:id", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM CUSTOMER WHERE ID=" + req.params.id,
      (err, recordsets) => {
        if (err) {
          console.log(err);
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res.status(400).send({ error: { err } });
        }

        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.status(200).send({ customer: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

// Get customer with given id.
router.get("/:id/address", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM ADDRESS WHERE customerID=" + req.params.id,
      (err, recordsets) => {
        if (err) {
          console.log(err);
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res.status(400).send({ error: { err } });
        }
        res.setHeader("Content-Type", "application/json");
        sql.close();
        return res.status(200).send({ customerAddress: recordsets.recordset }); // Result in JSON format
      }
    );
  });
});

module.exports = router;
