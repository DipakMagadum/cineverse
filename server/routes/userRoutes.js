const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});

router.get('/watchlist', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('watchlist');
  res.json(user.watchlist);
});

router.post('/watchlist/:movieId', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const id = req.params.movieId;
  const idx = user.watchlist.indexOf(id);
  if (idx === -1) user.watchlist.push(id);
  else user.watchlist.splice(idx, 1);
  await user.save();
  res.json({ watchlist: user.watchlist });
});

module.exports = router;