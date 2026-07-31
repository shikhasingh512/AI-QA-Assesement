class DynamicData {
 
    // Define the constructor with a parameter for anonymousId
        constructor(anonymousId) {
            // Use an underscore to indicate a private property
            this.anonymousId = anonymousId;
            // this.deviceID = deviceID;
        }
    
  
    // Define a getter method for anonymousId
    get anonymousId() {
      // Return the value of the private property
      return this._anonymousId;
    }
  
    // Define a setter method for anonymousId
    set anonymousId(newAnonymousId) {
        this._anonymousId = newAnonymousId;
    } 

    // get deviceID() {
    //     return this._deviceID;
    //   }
    
    //   set deviceID(newDeviceID) {
    //       this._deviceID = newDeviceID;
    //   } 
  }
  
  module.exports = { DynamicData };