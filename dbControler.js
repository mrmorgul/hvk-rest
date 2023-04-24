const crypto = require("crypto");
const db = require('./database');
const logger = require('./logger');

const className = "dbController.js";

const returnInternalError = (response, error) => {
  response.status(500).send({
    message: 'Internal error.',
  });
}

const getStatus = (guid, request, response) => {
  db.lookupStatus(guid, (err, results) => {
    logger.info("Requesting model status for guid: " + guid, className);

    if (err) {
      logger.error("getStatus database error" + err, className);
      returnInternalError(response, error);
    }
    else {
      logger.info("Status result is ready: " + guid, className);
      response.status(200).json(results.rows)
    }
  })
}

const getStatusModel = (model, guid, request, response) => {
  db.lookupStatusModel(model, guid, (err, results) => {
    logger.info("Requesting " + model + " status for guid: " + guid, className);

    if (err) {
      logger.error("getStatus database error" + err, className);
      returnInternalError(response, error);
    }
    else {
      logger.info("Result for " + model + " is ready: " + guid, className);
      response.status(200).json(results.rows)
    }
  })
}

const handlePost = (request, response) => {
  const guid = crypto.randomBytes(16).toString("hex");
  const { userid, data } = request.body;
  db.createReport(userid, data, guid, (error, results) => {
    if (error) {
      logger.error("handlePost database error" + error, className);
      returnInternalError(response, error);
    }
    else {
      logger.info(`Report added with ID: ${results.insertId}`);
      response.status(201).send("Report added with id.");
    }
  });
}

const getNextManuscriptToSend = async () => {
  let promise = new Promise(function (myResolve, myReject) {
    db.getNextManuscriptToSend((err, results) => {
      if (err) {
        logger.error("getting next to send to edison database error" + err, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return promise;
}

const getByStatus = async (status) => {
  let promise = new Promise(function (myResolve, myReject) {
    db.getByStatus(status, (err, results) => {
      if (err) {
        logger.error("getByStatus database error" + err, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return await promise;
}

const deleteResult = async (guid) => {
  let promise = new Promise(function (myResolve, myReject) {
    db.deleteResult(guid, (err, results) => {
      if (err) {
        logger.error("deleteResult database error" + err, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return promise;
}

const updateStatus = async (guid, status) => {
  let promise = new Promise(function (myResolve, myReject) {
    db.updateStatus(guid, status, (err, results) => {
      if (err) {
        logger.error("updateStatus database error" + err, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return promise;
}

const updateStatusWithModel = async (guid, status, model) => {
  let promise = new Promise(function (myResolve, myReject) {
    db.updateStatusWithModel(guid, status, model, (err, results) => {
      if (err) {
        logger.error("updateStatusWithModel database error" + err, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return promise;
}

const setStatusAsFinished = async (guid, result, status, model) => {
  let promise = new Promise(function (myResolve, myReject) {
    db.setStatusAsFinished(guid, result, status, model, (err, results) => {
      if (err) {
        logger.error("setStatusAsFinished database error " + err, result, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return promise;
}

const dispatchedExists = async () => {
  let promise = new Promise(function (myResolve, myReject) {
    db.dispatchedExists((err, results) => {
      if (err) {
        logger.error("dispatchedExists: database error" + err, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return promise;
}

const getDispatched = async () => {
  let promise = new Promise(function (myResolve, myReject) {
    db.getDispatched((err, results) => {
      if (err) {
        logger.error("getDispatched: database error" + err, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return promise;
}

const insert = async (guid, model, fileName, fileFormat, username) => {
  db.insert(guid, model, fileName, fileFormat, username, (err, value) => {
    if (err) {
      logger.error("Could not store model request in database " + err, className);
    }
  })
}

const insertParams = async (guid, targetAudience, targetGenre) => {
  logger.info('storing params ' + targetAudience + ", " + targetGenre + " for guid " + guid)

  db.insertParams(guid, targetAudience, targetGenre, (err, value) => {
    if (err) {
      logger.error("Could not store request parameters " + err, className);
    }
  })
}

const getParams = async (requestGuid) => {
  let promise = new Promise(function (myResolve, myReject) {
    db.getParams(requestGuid, (err, results) => {
      if (err) {
        logger.error("getParams database error" + err, className);
        myReject(err);
      }
      else {
        myResolve(results.rows);
      }
    })
  });
  return await promise;
}

module.exports = {
  insert,
  handlePost,
  getStatus,
  getStatusModel,
  insertParams,
  getParams,
  getByStatus,
  getDispatched,
  dispatchedExists,
  getNextManuscriptToSend,
  setStatusAsFinished,
  deleteResult,
  updateStatus,
  updateStatusWithModel
};