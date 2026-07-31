import { writeFileSync } from 'fs';

class storeResponseToJsonFile {

    // Define the constructor 
    constructor(){}

    // Create method for storing data into file 
    storeJsonDataToFile(storedData, fileName) {
        // Save the data to a JSON file 
        let jsonData = JSON.stringify(storedData, null, 2);
        // Indentation for pretty formatting
        writeFileSync(`./API/testdata/${fileName}.json`, jsonData);
        console.log(`Data has been saved to ${fileName}.json`);
    }


}
module.exports = { storeResponseToJsonFile };