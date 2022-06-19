require("dotenv").config();

module.exports = {
  dbUser: process.env.DATABASE_USER,
  dbPass: process.env.DATABASE_PASSWORD,
  dbHost: process.env.DATABASE_HOST,
  dbPort: process.env.DATABASE_PORT,
  appUrl: process.env.APP_URL,
  dbName: process.env.DATABASE_NAME,
  dbDialect: process.env.DATABASE_DIALECT,
  jwtSecret: process.env.APP_JWT_SECRET,
  jwtExpired: process.env.APP_JWT_EXPIRED,
};
