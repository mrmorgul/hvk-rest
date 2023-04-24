const logger = require("./logger");

const className = "auth.js";

const authorizeUser = (req) => {
  if (process.env.ENABLE_CALLER_CHECK == "false"){
    logger.info("Caller check is disabled");
    return true;
  }

  const allowedIPs = process.env.ALLOWED_CALLER_IP.split(',').map(address => { return address.trim() });

  if (allowedIPs.includes(req.ip)) {
      logger.info("User was authorized.", className);
      return true;
    }
    else {
      logger.error("User not authorized." + req.ip, className);
      return false;
    }
  }

  module.exports = {
      authorizeUser
  } 