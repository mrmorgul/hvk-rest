const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  //try {
    await client.connect();
    const database = client.db(process.env.MONGO_DATABASE);

    const insert = async (requestGuid,callback) => {
        const insertDate = new Date().toISOString();
        const requests = database.collection('requests');
        const result = await requests.insertOne({requestGuid, requestDate: insertDate, lastUpdated: insertDate});
        callback(null, result);
    }

    const deleteResult = async (guid, callback) => {
        const requests = database.collection('requests');
        const result = await requests.deleteOne({requestGuid: guid});
        callback(null, result);
    }

    const updateStatus = async (guid, status, callback) => {
        const requests = database.collection('requests');
        const result = await requests.updateOne({requestGuid: guid}, {$set: {requestStatus: status, lastUpdated: new Date().toISOString()}});
        callback(null, result);
    }

    const lookupStatus = async (guid, callback) => {
        const requests = database.collection('requests');
        const result = await requests.findOne({requestGuid: guid});
        callback(null, result);
    }

    const getByStatus = async (requestedStatus, callback) => {
        const requests = database.collection('requests');
        const result = await requests.find({requestStatus: requestedStatus}).toArray();
        callback(null, result);
    }
}

module.exports = {
    insert,
    lookupStatus,
    deleteResult,
    updateStatus,
    getByStatus
}