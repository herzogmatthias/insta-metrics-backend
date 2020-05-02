module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "InstagramDB",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
  production: {
    username: process.env.db_prod_username,
    password: process.env.db_prod_password,
    database: "lkHPJzH1Sq",
    host: process.env.db_prod_host,
    dialect: "mysql",
  },
};
