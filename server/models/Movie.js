const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:    { type: String, required: true },
  rating:  { type: Number, required: true },
  comment: { type: String, required: true }
}, { timestamps: true });

const downloadLinkSchema = new mongoose.Schema({
  quality:      { type: String },
  size:         { type: String },
  url:          { type: String },
  cloudinaryId: { type: String }
});

const movieSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  description:   { type: String, required: true },
  genre:         { type: [String], required: true },
  language:      { type: String, default: 'Hindi' },
  releaseYear:   { type: Number },
  rating:        { type: Number, default: 0 },
  posterUrl:     { type: String },
  posterCloudId: { type: String },
  trailerUrl:    { type: String },
  isTrending:    { type: Boolean, default: false },
  isFeatured:    { type: Boolean, default: false },
  cast:          { type: [String] },
  director:      { type: String },
  duration:      { type: String },
  downloadLinks: [downloadLinkSchema],
  downloadCount: { type: Number, default: 0 },
  views:         { type: Number, default: 0 },
  reviews:       [reviewSchema]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);