const express = require('express');
const Post = require('../models/post');

const route = express.Router();

route.post('', (req, res, nex) => {
  const post = Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    })
  }); // mongoose, creates query based on model.
  res.status(201).json({
    message: 'Post added successfully!'
  }); // OK
});

route.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Update successful!' });
  });
});

route.get('', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Post fetched successfully!',
        posts: documents
      });
    });
});

route.get('/:id'), (req, res, next) => {
  // Encoded ID from URL
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({message: 'Pos not found'});
    }
  });
}

route.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  });
  res.status(200).json({message: 'Post deleted!'});
});

module.exports = route;
