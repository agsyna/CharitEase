const Club = require("../models/club");

const fs = require("fs");
require("dotenv").config();

const path = require("path");

const createClub = async (req, res) => {
  try {
    const { title, description, venue } = req.body;

    const { image } = req.files;

    if (!title || !description || !venue) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const supportedFile = ["jpg", "png", "jpeg"];

    const ext = image.name.split(".")[1];

    if (!ext || !supportedFile.includes(ext)) {
      return res.status(400).json({
        success: false,
        message: "file extension is not supported",
      });
    }

    const fileName = `${Date.now()}.${ext}`;

    try {
      fs.renameSync(
        image.tempFilePath,
        path.join(__dirname, "..", "public", "images", fileName)
      );
    } catch (err) {
      console.log("failed to store image");
      return res.status(500).json({
        success: false,
        message: "failed to store image",
      });
    }

    const club = await Club.create({
      title,
      description,
      venue,
      image: `http://127.0.0.1:${process.env.PORT}/images/${fileName}`,
    });

    res.status(200).json({
      success: true,
      message: "Club created successfully",
      club,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "failed to create club",
    });
  }
};

const getClub = async (req, res) => {
  try {
    const club = await Club.find({});

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Club fetched successfully",
      club,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to get club",
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

module.exports = { createClub, getClub, deleteClub , updateClub};
