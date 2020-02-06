'use strict';

const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static('public'));

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/registerpage', (req, res) => {
  res.sendFile(__dirname +'/public/registerpage.html')
})

app.get('/users', (req, res) => {
  conn.query('SELECT * FROM users;', (err, rows) => {
    if (err) {
      res.send({ error: 'Valami nem ok' });
    } else {
      res.send({ users: rows });
    }
  })
});

app.post('/register', (req, res) => {
  const name = req.body.name;
  const params = [];
  params.push(name);
  if (name) {
    conn.query('INSERT INTO users (name) VALUES(?);',params, (err, rows) => {
      if(err) {
        res.send({ error: 'Valami nem ok' });
      } else {
        res.send({ user: 'created' });
      }
    })
  }
})

conn.connect(err => {
  if (err) {
    console.error('Cannot connect to the database');
    return;
  }
  console.log('Connection established');
});

app.listen(PORT || 3000);
