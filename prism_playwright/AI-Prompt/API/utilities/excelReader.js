const xlsx = require("xlsx");
// Function to read data from an Excel sheet
function readExcel(filePath, sheetName) {
  try {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet, { header: "A" });
  } catch (error) {
    throw new Error(`Failed to read Excel file: ${error.message}`);
  }
}

module.exports = { readExcel };