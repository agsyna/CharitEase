const { error } = require("console");
const Event = require("../models/club");

const fs = require("fs");
require("dotenv").config();

const path = require("path");

{/* <form id = "eventform"action="#" method="POST" onsubmit="createevent(event)">
<!-- Community Name -->
<label for="community_name">Community Name</label>
<select id="community_name" name="community_name">
  <option value="Chetna">Chetna</option>
  <option value="Savera">Savera</option>
  <option value="CRY">CRY</option>
</select>

<!-- Event Name -->
<label for="event_name">Event Name</label>
<input type="text" id="event_name" name="event_name" required>

<!-- Theme -->
<label for="theme">Theme</label>
<input type="text" id="theme" name="theme" required>

<!-- Images -->
<label for="image">Event Image URL</label>
<input type="url" id="image" name="image" required>
<label for="bg_image">Background Image URL</label>
<input type="url" id="bg_image" name="bg_image">

<!-- Eligibility -->
<label for="eligibility">Eligibility</label>
<input type="text" id="eligibility" name="eligibility" required>

<!-- Number of Volunteers -->
<label for="no_of_volunteers_required">Number of Volunteers Required</label>
<input type="number" id="no_of_volunteers_required" name="no_of_volunteers_required" required>

<label for="no_of_volunteers_registered">Number of Volunteers Registered</label>
<input type="number" id="no_of_volunteers_registered" name="no_of_volunteers_registered">

<!-- Date and Time -->
<label for="date">Date</label>
<input type="date" id="date" name="date" required>

<label for="time">Time</label>
<input type="time" id="time" name="time">

<!-- Place -->
<label for="place">Place</label>
<input type="text" id="place" name="place" required>

<!-- About -->
<label for="about">About</label>
<textarea id="about" name="about" rows="4" required></textarea>

<!-- Features -->
<label>Features</label>
<div class="features-section" id="features-container">
  <input type="text" name="features_title[]" placeholder="Feature Title" required>
  <input type="text" name="features_img[]" placeholder="Feature Image URL" required>
  <input type="text" name="features[]" placeholder="Feature Description" required>
</div>
<button type="button" class="add-feature-btn" id="add-feature-btn">+ Add More Features</button>

<!-- Perks -->
<label for="perks">Perks (comma-separated)</label>
<input type="text" id="perks" name="perks" placeholder="Certificates, Snacks, Free-Wifi">

<!-- Submit -->
<input type="submit" value="Add Event">
</form> */}

const createEvent = async (req, res) => {
  try {
    const { community_name, 
      event_name, 
      theme,
       eligibility,
      no_of_volunteers_required,
      no_of_volunteers_registered,
      date,time,place,about,} = req.body;

     const { features, perks } = req.body;

    const { image,bg_image } = req.files;

    if (!community_name || !event_name || !theme || !eligibility ||
      !no_of_volunteers_required || !no_of_volunteers_registered || !date || !time || !place || !about ||
     !features|| !perks) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled!",
      });
    }

    const featuresArray = JSON.parse(features);
    const perksArray = JSON.parse(perks);

    const supportedFile = ["jpg", "png", "jpeg"];

    const image_ext = image.name.split(".")[1];
    const bg_image_ext = bg_image.name.split(".")[1];

    if (!supportedFile.includes(image_ext) || !supportedFile.includes(bg_image_ext) ) {
      return res.status(400).json({
        success: false,
        message: "File Extension Not Supported",
      });
    }

    const imageFileName = `${Date.now()}-image.${image_ext}`;
    console.log("imageFileName"+imageFileName);
    const bgImageFileName = `${Date.now()}-bg.${bg_image_ext}`;
    console.log("bgimageFileName"+bgImageFileName);


    try {
      fs.renameSync(
        image.tempFilePath,
        path.join(__dirname, "..", "public", "images", imageFileName)
      );
      fs.renameSync(
        bg_image.tempFilePath,
        path.join(__dirname, "..", "public", "images", bgImageFileName)
      );
    } catch (err) {
      console.log("Error : "+ err);
      return res.status(500).json({
        success: false,
        message: "Error : "+err,
      });
    }

    const event = await Event.create({
      community_name,
      event_name,
      theme,
      eligibility,
      no_of_volunteers_required,
      no_of_volunteers_registered,
      date,
      time,
      place,
      about,
      features: featuresArray,
      perks: perksArray,
      image: `http://127.0.0.1:${process.env.PORT || 4000}/images/${imageFileName}`,
      bg_image: `http://127.0.0.1:${process.env.PORT || 4000}/images/${bgImageFileName}`,
    });



    

    res.status(200).json({
      success: true,
      message: "Event Added Successfully",
      event,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed To Add Club",
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const event = await Event.find({});

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Events not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      event,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed"+err,
    });
  }
};


const deleteClub = async (req, res) => {
  try {
    const { clubId } = req.params;

    let club = await Club.findOne({ _id: clubId });

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    const imageName = path.basename(club.image);

    try {
      fs.unlinkSync(path.join(__dirname, "..", "public", "images", imageName));
    } catch (err) {
      console.log("failed to delete image", err);
    }

    club = await Club.findByIdAndDelete({ _id: clubId });

    res.status(200).json({
      success: true,
      message: "Club deleted successfully",
      club,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "failed to delete club",
    });
  }
};

const updateClub = async (req, res) => {
  try {
    const clubId = req.params.clubId;

    const {title , description, venue} = req.body;

   

    const club = await Club.findByIdAndUpdate(
      { _id: clubId },
      {
        title,
        description,
        venue,
      },
      {new:true}
    );

    if(!club){
      return res.status(401).json({
        success: false,
        message: "Club not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Club updated successfully",
      club,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "failed to update club",
    });
  }
};

module.exports = { createEvent, getEvents, deleteClub , updateClub};
