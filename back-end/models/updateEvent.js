const mongoose = require('mongoose');



const EventSchema = new mongoose.Schema({
    community_name: {
      type: String,

      enum: ['Chetna', 'Savera', 'CRY'], // Add more communities if needed
    },
    event_name: {
      type: String,

    },
    theme: {
      type: String,

    },
    eligibility: {
      type: String,

    },
    no_of_volunteers_required: {
      type: Number,

      min: 1,
    },
    no_of_volunteers_registered: {
      type: Number,
      default: 0,
      min: 0,
    },
    date: {
      type: Date,

    },
    time: {
      type: String,

    },
    place: {
      type: String,

    },
    about: {
      type: String,

    },
    features: [
      {
        title: { type: String, required: true },
        img_url: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    perks: {
      type: [String],
      default: [],
    },
    image: {
      type: String, 

    },
    bg_image: {
      type: String, 

    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('newEvent', EventSchema);