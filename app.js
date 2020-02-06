'use strict';

const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

let conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

conn.connect((err) => {
  if (err) {
    console.error('Cannot connect to the database');
    return;
  }
  console.log('Connection established');
});

app.get('/', (req, res) => {
  conn.query('SELECT * FROM users', (err, rows) => {
    res.send(rows);
  })
});

app.get('/add', (req, res) => {
  if (req.query.name) {
    conn.query('INSERT INTO users (name) VALUES(?);', [req.query.name], (err, rows) => {
      res.send({ user: 'created' });
    })
  }
})

app.listen(PORT || 3000);