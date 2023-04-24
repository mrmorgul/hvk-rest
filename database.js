const { MongoClient } = require('mongodb');

//const uri = process.env.MONGO_URI;
const url = 'mongodb://root:example@localhost:27017/test';
const client = new MongoClient(url);
let database;

async function run() {
  try {
    await client.connect();
    database = client.db('test');
    }
    catch (err) {
        console.error(err);
      }
    }

    const insert = async (request,callback) => {
        const insertDate = new Date().toISOString();
        //const requests = database.collection('requests');
        const result = await database.insertOne({request, requestDate: insertDate, lastUpdated: insertDate});
        callback(null, result);
    }

    const deleteResult = async (request, callback) => {
        const requests = database.collection('requests');
        const result = await requests.deleteOne(request);
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


module.exports = {
    insert,
    lookupStatus,
    deleteResult,
    updateStatus,
    getByStatus
}