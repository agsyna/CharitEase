const Star = require('../models/starsoftheweek');

const getStars = async (req, res) => {
    try {
      const star = await Star.find({});
  
      if (!star) {
        return res.status(404).json({
          success: false,
          message: "Stars Not Found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Stars Fetched Successfully",
        star,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed"+err,
      });
    }
  };

  module.exports = getStars;