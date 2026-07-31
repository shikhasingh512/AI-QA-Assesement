
import { logger } from "../UI/utilities/logger";

export default class loggerUtilities {
    /**
     * Creates an instance of CommonUtils.
     * @constructor
     * @param {page} page - A Page refers to a single tab or a popup within a browser context.
     */
    constructor(page) {
      this.page = page;
    }

      /**
   * To log the message on the console window
   */
  logger(message) {
    const timestamp = new Date().toISOString();
    logger.info(`[${timestamp}] ${message}`);
  }

    
}