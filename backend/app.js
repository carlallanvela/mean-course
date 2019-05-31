const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header',
  'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// Contoller
app.use('/api/posts', (req, res, next) => {
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
