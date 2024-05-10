/**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: uploadImages.js
* Description: API to upload images and create thumbnails for 
*              product post
**************************************************************/ 

import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res, next) => {
  // Check if req.file exists
  if (!req.file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }

  // Get the temporary path of the uploaded file
  const tempPath = req.file.path;

  // Specify the destination path where you want to save the file
  const destinationPath = './images/uploads/' + req.file.originalname;
  const thumbnailPath = './images/thumbnails/' + req.file.originalname;

  // Move the file from the temporary location to the destination
  fs.rename(tempPath, destinationPath, async err => {
    if (err) {
      return next(err);
    }
    // Create a thumbnail
    try {
      await sharp(destinationPath)
        .resize(100, 100)
        .toFile(thumbnailPath);
    } catch (err) {
      return next(err);
    }    
    // Send a response indicating the file has been saved
    res.send('File uploaded and saved successfully');
  });
});

export default router;