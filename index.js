const express = require('express')
const db = require('./database')
//const auth = require('./auth')
const app = express()
const port = 3000
//const mongodb = require('./mongodb');

app.get('/', (req, res) => {
  res.send('Hello World! !!!!!')
})

app.listen(port, () => {
  console.log(`HVK-REST app listening at http://localhost:${port}`)
})

app.post('/test', async (req, res) => {
  try {
    await db.insert({ name: 'John Doe', age: 30 });
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/insert', async (req, res) => { 
  //await db.insert({ name: 'John Doe', age: 32 };
  //await = db.insert({ name: 'John Doe', age: 32 });
  try {
    return db.insert({ name: 'John Doe', age: 32 });
    //res send();
  } catch (err)  {
      res.status(400).send({
      status: 400,
      message: 'unsuccessfully created record.'
      })
    } finally {
      res.status(200).send({
        status: 200,
        message: 'Successfully created record.'
        })
    }
  })


app.get('/g', (req, res) => {
  res.send('g-Hello World!')
})