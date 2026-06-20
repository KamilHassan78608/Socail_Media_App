const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile, followUser, searchUsers, getSuggestions } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/search', protect, searchUsers);
router.get('/suggestions', protect, getSuggestions);
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.get('/:username', getUserProfile);
router.post('/:id/follow', protect, followUser);

module.exports = router;
