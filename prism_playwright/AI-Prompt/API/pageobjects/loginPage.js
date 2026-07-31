import { random } from "faker";
// For creation of Login page data
// create JSON objects for headers and endpoints corresponding to respective page.

const loginPage = {};



// Example to dynamiclly set values in data object , Getting the value of anonymousid from login test and using it in again in second case
loginPage.loginHeader = {
  accept: "application/json",
};
loginPage.loginEndpoint =
  "api/v1/auth/login/";

loginPage.loginBody = {
    "email":"FdstwKkHqdDQ3v5tmuIbdQXkNyaoJ0eRjISWSf9IRbQmEPYSd7T3XteXg7BdpQbq+7gMmDu82zT3nr9pygOtVhWPylceJJ0N11e26RHanTxp/69dDXLNApdU7V/r6xaDeDNZSYjlB9bmnB6o5M6n+QWPgQWNoJ9Bjrm/KxZn923XNe/QNu+FI0aUgbQi+/jh90n1tf/PDGtLvtw6mnNOjtgdkY85jwg7Th0sibRwPtNGFW9kH1GEkEunZk6aaVisEUf6zo/hht1/7yAAddi7VMK+KX/0y8Q+GZdYZqFG9Zwx156w7Wm36w6YST7K5xTFTX1csMaPBdodHP3Cg5o1oA==",
    "password": "FQ43FdeV9OIWjSjZnj959H9h8ZkZ3kBvlFzOSFsuh3nGMzJa2C5e0Bmq29lV834O9sklif6UrUmZ0XLbC6R3tNWyDmuyvFp25bZFSz+IcAscdyh9/9LQmYJFGp2Uhn5AYeWGGLhf7L+QKc/biz/XEHIx5fPE+4RW+fLIGyOHCNRy4lC1Qx1IfZ125D6XKWOcSqRwsE3f7RvBTN+khY9zP9dQohM+0dnZmAEmpXh3RmuH47h9+AMQ/lG568nwX3lKETAZjfUD3lGwRq9/wc0yqAamPTkTGkGGqvMPgxng2cprW3MnifcBMm9oDlywRIFmgLA8kp1MB3hqqHO5IKYzXQ=="
};

module.exports = loginPage;
