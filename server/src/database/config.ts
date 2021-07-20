require('dotenv').config();
module.exports = {
  'development': {
    'username': process.env.USERNAME,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE,
    'host': process.env.HOSTNAME,
    'dialect': process.env.DIALECT,
  },
  'test': {
    'username': process.env.USERNAME_TEST,
    'password': process.env.PASSWORD_TEST,
    'database': process.env.DATABASE_TEST,
    'host': process.env.HOSTNAME_TEST,
    'dialect': process.env.DIALECT,
  },
  'production': {
    'username': process.env.USERNAME_PROD,
    'password': process.env.PASSWORD_PROD,
    'database': process.env.DATABASE_PROD,
    'host': process.env.HOSTNAME_PROD,
    'dialect': process.env.DIALECT,
  }
}
