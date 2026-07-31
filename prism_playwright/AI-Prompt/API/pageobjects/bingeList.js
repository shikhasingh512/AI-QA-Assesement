const bingeList ={}

bingeList.favorite_endpoint = `/action-data-provider/subscriber/favourite?profileId=${profileID}&subscriberId=${SID}&contentId=${contentId}&contentType=${contentType}`
bingeList.favoriteHeader = {
    accept: "application/json",
    platform: "BINGE_ANYWHERE_WEB",
    deviceid: deviceID,
    /**
     * @param {{ toString: () => any; }} anonymousid1
     */
    set anonymousid(anonymousid1) {
      this._anonymousid = anonymousid1.toString();
    },
    anonymousid: "",
  };

module.exports = { bingeList}