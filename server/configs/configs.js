module.exports = {

  development: {
    NODE_ENV: 'development',
    PORT: 3000,
    VALIDATE_DB: 'ON',
    DB_HOST: process.env.DB_HOST || '192.168.99.100' || 'localhost' ,
    DB_USER: process.env.DB_USER || 'developer',
    DB_PASS: process.env.DB_PASS || 'qwerty',
    DB_NAME: process.env.DB_NAME || 'db_api',
    DB_CLIENT: process.env.DB_CLIENT || 'pg' || 'sqlite3',
    DB_FILE: process.env.DB_FILE || 'carpool.sqlite'
  }

}
