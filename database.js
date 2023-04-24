const { MongoClient } = require('mongodb');

//const uri = process.env.MONGO_URI;
const uri = 'mongodb://root:example@localhost:27017/test';
const client = new MongoClient(uri, {
    serverApi: {
        version: 'ServerApiVersion.v1',
        strict: true,
        deprecationErrors: true,
    }
});

//let database;

async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
    //database = client.db('test');
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
    
    const insert = async (request,callback) => {
        const insertDate = new Date().toISOString();
        const myDB = client.db('test')
        const myColl = myDB.collection('testcoll');
        const result = await myColl.insertOne(request);
        console.log('record added: ${result.insertedId}')
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