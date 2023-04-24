const express = require('express')
const app = express()
const port = 3000
const mongodb = require('./mongodb');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.testdb(
  mongodb.insertDocument({ name: 'John Doe', age: 30 });
)