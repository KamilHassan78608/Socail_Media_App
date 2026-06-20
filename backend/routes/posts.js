const express = require('express');
const router = express.Router();
const { createPost, getFeed, explorePosts, getPost, deletePost, likePost } = require('../controllers/postController');
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/feed', protect, getFeed);
router.get('/explore', protect, explorePosts);
router.post('/', protect, upload.single('image'), createPost);
router.get('/:id', protect, getPost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, likePost);
router.post('/:id/comments', protect, addComment);
router.get('/:id/comments', protect, getComments);

module.exports = router;
