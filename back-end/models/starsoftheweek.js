const mongoose = require('mongoose');

const starsSchema = new mongoose.Schema({
    community_name: {
      type: String,
      required: true,
    },
    event_name: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    no_of_volunteers_registered: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    perks: {
      type: [String],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  });

  const stars = mongoose.model('starsoftheweek',starsSchema);

  module.exports=stars;

