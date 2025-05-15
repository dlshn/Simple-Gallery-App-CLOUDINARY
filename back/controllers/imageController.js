const Image = require('../models/Image');

const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    const image = new Image({ url: req.file.path });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getImages, uploadImage };
