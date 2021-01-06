const dotenv = require("dotenv");
dotenv.config();

var sqlConfig = {
  server: `${process.env.SERVER}`,
  database: `${process.env.DATABASE}`,
  user: `${process.env.USERNAME}`,
  password: `${process.env.PASSWORD}`,
};

module.exports = sqlConfig;
