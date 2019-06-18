const express = require('express');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'img/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (rq, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

// Multer will extract image
router.post(
  '',
  checkAuth,
  multer({ storage: storage }).single('image'),
  (req, res, nex) => {
    const url = req.protocol + '://' + req.get('host');
    const post = Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      creator: req.userData.userId
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: 'Post added successfully',
        post: {
          ...createdPost,
          id: createdPost._id
          // Spread operator gets all of these
          //title: createdPost.title,
          //content: createdPost.content,
          //imagePath: createdPost.imagePath
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Creating a post failed!'
        });
      })
    });
  });

router.post(
  '',
  (req, res, nex) => {
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

router.put(
  '/:id',
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.userData.userId
    });
    Post.updateOne(
      { _id: req.params.id, creator: req.userData.userId },
      post
    ).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Could not update post!'
      })
    });
  }
);

router.get('', (req, res, next) => {
  // Holds parsed query params
  // req.query;
  const pageSize = +req.query.pagesize; // turn to int
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1)) // skip previous pages
      .limit(pageSize); // limit doc we return
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching posts failed!'
      })
    });
});

router.get('/:id', (req, res, next) => {
  // Encoded ID from URL
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching posts failed!'
    })
  });;
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Delete successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting posts failed!'
      })
    });;
});

module.exports = router;
