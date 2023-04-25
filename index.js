const express = require('express')
const db = require('./database')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! !!!!!')
})

app.listen(port, () => {
  console.log(`HVK-REST app listening at http://localhost:${port}`)
})

app.get('/insert', async (req, res) => { 
  try {
    return db.insert({ name: 'John Doe', age: 32 });
    res.send();
  } catch (err)  {
      res.status(400).send({
      status: 400,
      message: 'unsuccessfully created record.'
      })
    } finally {
      res.status(200).send({
        status: 200,
        message: 'Successfully created record.' + res
        })
    }
  })


  app.get('/getname', async (req, res) => {
    try {
      const name = await db.getname('John Doe');
      res.status(200).send({
        status: 200,
        message: 'Successfully fetched record.',
        data: name
      });
    } catch (err)  {
      res.status(400).send({
        status: 400,
        message: 'Failed to fetch record.'
      });
    }
  });
  