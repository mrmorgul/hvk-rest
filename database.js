const { MongoClient } = require('mongodb');



//const uri = 'mongodb://root:admin@127.0.0.1:27017/admin?tls=false';
//const uri = 'mongodb://root:admin@hvk.morgul.dk:27017/admin?tls=false';
const uri = 'mongodb://root:admin@myhost:27017/admin?tls=false';
//const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {

  try {
    await client.connect();

    await listDatabases(client);
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
    //database = client.db('test');
    } catch(e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
      }
    }

run().catch(console.error);
 
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

    const insert = async (data) => {
        const myDB = client.db('test');
        const myColl = myDB.collection('testcoll');
        const result = await myColl.insertOne(data);
        console.log(`record added - db.js: ${result.insertedId}`);
        return await result;
    }

    const getname = async (data) => {
        const myDB = client.db('test');
        const myColl = myDB.collection('testcoll');
        const result = await myColl.findOne({name: data});
        console.log(`record fetched - db.js: ${result.insertedId}`);
        return await result;
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
    getname,
    lookupStatus,
    deleteResult,
    updateStatus,
    getByStatus
}