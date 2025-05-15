// backend/routes/imageRoutes.js
const express = require('express');
const router = express.Router();

const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

const { getImages, uploadImage } = require('../controllers/imageController');

router.get('/', getImages);
router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
