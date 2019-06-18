const express = require('express');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const router = express.Router();

const PostsController = require('../controllers/posts');

// Multer will extract image
router.post(
  '',
  checkAuth,
  extractFile,
  PostsController.createPost
);

router.put(
  '/:id',
  checkAuth,
  extractFile,
  PostsController.updatePost
);

router.get(
  '',
  PostsController.getPosts
);

router.get(
  '/:id',
  PostsController.getPost
);

router.delete(
  '/:id',
  checkAuth,
  PostsController.deletePost
);

module.exports = router;
