const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Sagale movies
router.get('/', async (req, res) => {
  try {
    const { genre, language, search, year } = req.query;
    let filter = {};
    if (genre)    filter.genre = { $in: [genre] };
    if (language) filter.language = language;
    if (year)     filter.releaseYear = year;
    if (search)   filter.title = { $regex: search, $options: 'i' };
    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Trending
router.get('/trending', async (req, res) => {
  try {
    const movies = await Movie.find({ isTrending: true }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Featured
router.get('/featured', async (req, res) => {
  try {
    const movie = await Movie.findOne({ isFeatured: true });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    movie.views += 1;
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Review add kara
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    movie.reviews.push({
      user:    req.user._id,
      name:    req.user.name,
      rating:  req.body.rating,
      comment: req.body.comment
    });
    movie.rating = movie.reviews.reduce((a, r) => a + r.rating, 0) / movie.reviews.length;
    await movie.save();
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Download count + link
router.get('/:id/download/:quality', protect, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const link = movie.downloadLinks.find(l => l.quality === req.params.quality);
    if (!link) return res.status(404).json({ message: 'Quality not available' });

    movie.downloadCount += 1;
    await movie.save();

    res.json({ url: link.url, title: movie.title, quality: link.quality });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;