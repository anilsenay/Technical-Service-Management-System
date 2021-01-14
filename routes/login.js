var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Login authentication.
router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query(
      "SELECT * FROM EMPLOYEE WHERE username='" +
        username +
        "' AND password='" +
        password +
        "'",
      (err, recordsets) => {
        if (err) {
          console.log(err);
          if (err.code === "ENOCONN")
            return res.status(503).send({ error: { err } });
          return res
            .status(400)
            .send({ error: "Username or password is incorrect!" });
        }

        res.setHeader("Content-Type", "application/json");
        sql.close();
        if (!recordsets.recordset[0])
          return res
            .status(400)
            .send({ error: "Username or password is incorrect!" });
        return res.status(200).send({ user: recordsets.recordset[0] }); // Result in JSON format
      }
    );
  });
});

module.exports = router;
