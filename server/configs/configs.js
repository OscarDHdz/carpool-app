module.exports = {

  development: {
    NODE_ENV: 'development',
    PORT: 3000,
    VALIDATE_DB: 'ON',
    // Select client: sqlite3 | pg
    DB_CLIENT: 'sqlite3',
    DB_FILE: 'carpool.sqlite',
    // PostgreSQL -------------------------
    DB_HOST: 'localhost' ,
    DB_USER: 'developer',
    DB_PASS: 'qwerty',
    DB_NAME: 'db_api',
    // Auth Access ------------------------
    ADMIN_USER: 'admin',
    ADMIN_PASS: 'admin',
    PUBLIC_USER: 'user',
    PUBLIC_PASS: 'user',
    // Auth Security ---------------------
    JWT_SECRET: 'qwerty'
  },

  production: {
    NODE_ENV: 'production',
    PORT: process.env.PORT,
    VALIDATE_DB: 'ON',
    DB_HOST: process.env.DB_HOST ,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_CLIENT: process.env.DB_CLIENT,
    DB_FILE: process.env.DB_FILE,
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASS: process.env.ADMIN_PASS,
    PUBLIC_USER: process.env.PUBLIC_USER,
    PUBLIC_PASS: process.env.PUBLIC_PASS,
    JWT_SECRET: process.env.JWT_SECRET
  }

}
