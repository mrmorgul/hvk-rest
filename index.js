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
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/test', async(req, res) => {
  await db.insert({ name: 'John Doe', age: 30 });
  res.send()
  }
)

app.get('/g', (req, res) => {
  res.send('g-Hello World!')
})