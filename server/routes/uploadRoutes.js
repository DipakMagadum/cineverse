const express = require('express');
const router = express.Router();
const { cloudinary, uploadImage, uploadVideo } = require('../config/cloudinary');
const Movie = require('../models/Movie');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/poster', protect, adminOnly,
  uploadImage.single('poster'), async (req, res) => {
    try {
      res.json({ url: req.file.path, public_id: req.file.filename });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.post('/video', protect, adminOnly,
  uploadVideo.single('video'), async (req, res) => {
    try {
      const sizeInMB = (req.file.size / (1024 * 1024)).toFixed(1);
      const size = sizeInMB > 1024
        ? (sizeInMB / 1024).toFixed(1) + ' GB'
        : sizeInMB + ' MB';
      res.json({
        url:       req.file.path,
        public_id: req.file.filename,
        quality:   req.body.quality || '720p',
        size
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.post('/movie', protect, adminOnly, async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      genre: Array.isArray(req.body.genre)
        ? req.body.genre
        : req.body.genre.split(',').map(g => g.trim()),
      cast: req.body.cast
        ? req.body.cast.split(',').map(c => c.trim())
        : []
    });
    res.status(201).json({ message: '🎬 Movie added!', movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/movie/:id', protect, adminOnly, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Movie updated!', movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/movie/:id', protect, adminOnly, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie.posterCloudId)
      await cloudinary.uploader.destroy(movie.posterCloudId);
    for (const link of movie.downloadLinks) {
      if (link.cloudinaryId)
        await cloudinary.uploader.destroy(link.cloudinaryId, { resource_type: 'video' });
    }
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;