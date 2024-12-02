const mongoose = require('mongoose');



const EventSchema = new mongoose.Schema({
    community_name: {
      type: String,
      required: true,
      enum: ['Chetna', 'Savera', 'CRY'], // Add more communities if needed
    },
    event_name: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    no_of_volunteers_required: {
      type: Number,
      required: true,
      min: 1,
    },
    no_of_volunteers_registered: {
      type: Number,
      default: 0,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
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
      required: true,
    },
    bg_image: {
      type: String, 
      required: true,
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

module.exports = mongoose.model('Event', EventSchema);