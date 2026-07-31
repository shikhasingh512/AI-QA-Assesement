import { appendFileSync,writeFile } from "fs";

const logApiRequest = async (method, endPoint, headers, postData) => {
  // Construct the curl command
  let curlCommand = `curl -X ${method} `;
  curlCommand += `${process.env.URL}${endPoint}`;
  // Add headers to the curl command  for (const headerName in headers)
  for (const headerName in headers) {
    const headerValue = headers[headerName];
    curlCommand += ` -H '${headerName} : ${headerValue}'`;
  }
  // Add request body to the curl command (if exists)
  if (postData) {
    curlCommand += ` -d '${JSON.stringify(postData)}'`;
  }
  
  // Log the curl command to a file (e.g., api_requests.log)
  console.log(curlCommand)
  appendFileSync("./API/testdata/api_requests.log", curlCommand + "\n");
};

const suiteStarter = async () => {
 let data = `${new Date().toLocaleDateString()} : Test Suite Started \n`
    writeFile("./API/testdata/api_requests.log", data, function (err) {
      if (err) throw err;
      console.log('Replaced!');
    });
};

module.exports = { logApiRequest,suiteStarter };
