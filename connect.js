var Connection = require("tedious").Connection;
var config = {
  server: "techinacalservicedatabase.database.windows.net",
  authentication: {
    type: "default",
    options: {
      userName: "admin123",
      password: "Admin159255",
    },
  },
  options: {
    database: "TechnicalServiceDatabase",
    instanceName: "Sqlexpress",
    rowCollectionOnDone: true,
    useColumnNames: false,
  },
};
var connection = new Connection(config);
connection.on("connect", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});
module.exports = connection;
