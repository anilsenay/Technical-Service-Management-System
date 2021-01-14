const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/.env` });

var sqlConfig = {
  server: `${process.env.SERVER}`,
  database: `${process.env.DATABASE}`,
  user: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
};

module.exports = sqlConfig;
