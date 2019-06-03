const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

// mongoose.connect(
//   'mongodb+srv://admin2:WBAkJdfp2lcyejnq@cluster0-ojzmt.mongodb.net/',
//   {
//     keepAlive: true,
//     socketTimeoutMS: 30000,
//     dbName: 'node-angular',
//     useNewUrlParser: true
//   }
// )
// .then(() => {
//   console.log('Connected to database!');
// })
// .catch((err) => {
//   console.log('Connection failed!', err.message);
// });

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:test@cluster0-ojzmt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/posts', (req, res, nex) => {
  const post = Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save(); // mongoose, creates query based on model.
  res.status(201).json({
    message: 'Post added successfully!'
  }); // OK
});

// Contoller
app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: '12345',
      title: 'First server-side post',
      content: 'This is coming from the server.'
    },
    {
      id: '23456',
      title: 'Second server-side post',
      content: 'This is coming from the server.'
    }
  ];
  res.status(200).json({
    message: 'Post fetched successfully!',
    posts: posts
  });
});

module.exports = app;
