// create web server
//
// 1. create web server
// 2. create database connection
// 3. create routes

// 1. create web server
const express = require('express')
const app = express()
const port = 3000

// 2. create database connection
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'comment_system'
})

connection.connect()

// 3. create routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 3.1 GET /comments
app.get('/comments', (req, res) => {
  // execute query
  connection.query('SELECT * FROM comments', function (error, results, fields) {
    if (error) throw error
    // return response
    res.json(results)
  })
})

// 3.2 POST /comments
app.post('/comments', (req, res) => {
  // execute query
  connection.query('INSERT INTO comments SET ?', req.body, function (error, results, fields) {
    if (error) throw error
    // return response
    res.json(results)
  })
})

// 3.3 PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  // execute query
  connection.query('UPDATE comments SET ? WHERE id = ?', [req.body, req.params.id], function (error, results, fields) {
    if (error) throw error
    // return response
    res.json(results)
  })
})

// 3.4 DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  // execute query
  connection.query('DELETE FROM comments WHERE id = ?', req.params.id, function (error, results, fields) {
    if (error) throw error
    // return response
    res.json(results)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
