const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://root:example@localhost:27017/test';

// Database Name
const dbName = 'test';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to the server
client.connect(function(err) {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connected successfully to MongoDB');

  const db = client.db(dbName);
  
  // Use the db variable to perform database operations
  // ...

  // Close the client connection when you are done
  client.close();
});
