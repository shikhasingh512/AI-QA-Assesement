const { test, expect } = require("@playwright/test");
const { createPool } = require("mysql");
require("dotenv").config();

const host = process.env.HOST;
const user = process.env.DBUSER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const pool = createPool({
  host: host,
  user: user,
  password: password,
  database: database,

  /* Use below properties on need basis */
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  waitForConnections: true,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 5,

});


class databaseManager {
  constructor(page) {
    this.page = page;
  }

  async connectToDatabase(query) {
    return new Promise((resolve, reject) => {
      console.log("DB connection initiated");
      pool.query(query, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(data[0]);
      });
    });
  }

  async connectToDatabaseWithQueryParam(data_array, query) {
    return new Promise((resolve, reject) => {
      console.log("DB connection initiated");
      pool.query(query, [data_array[0]], (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(data[0]);
      });
    });
  }
}

module.exports = { databaseManager };
