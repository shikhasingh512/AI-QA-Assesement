const xlsx = require("xlsx");
// Function to write data to an Excel sheet
function writeExcel(filePath, sheetName, data) {
  try {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    const newWorksheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = newWorksheet;
    xlsx.writeFile(workbook, filePath);
  } catch (error) {
    throw new Error(`Failed to write to Excel file: ${error.message}`);
  }
}
module.exports = { writeExcel };
