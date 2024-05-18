/**************************************************************
 * Class: CSC-648-03 Spring 2024
 * Team: 05
 * GitHub ID: csc648-sp24-03-team05
 * Project: SWE Final Project
 *
 * File: uploadImage.js
 * Description: API to upload images and create thumbnails for
 *              product post
 **************************************************************/

import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import db from "../conf/database.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res, next) => {
  // Check if req.file exists
  if (!req.file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  // Get the temporary path of the uploaded file
  const tempPath = req.file.path;

  // Specify the destination path where you want to save the file
  const destinationPath = "./images/uploads/" + req.file.originalname;
  const thumbnailPath = "./images/thumbnails/" + req.file.originalname;

  // Move the file from the temporary location to the destination
  fs.rename(tempPath, destinationPath, async (err) => {
    if (err) {
      return next(err);
    }
    const username = req.session?.user?.username ?? "joseph";
    // Create a thumbnail
    try {
      await sharp(destinationPath).resize(100, 100).toFile(thumbnailPath);

      // create product post
      const userId = await getUserId(username);
      saveProductPost({
        ...req.body,
        imageFile: req.file.originalname,
        userId,
      });
    } catch (err) {
      return next(err);
    }
    // Send a response indicating the product post has been created
    res.status(201).json({
      message: `Product post from ${username} is created successfully...`,
    });
  });
});

const saveProductPost = async ({
  title,
  description,
  price,
  categoryId,
  imageFile,
  userId,
}) => {
  const sql =
    "INSERT INTO t_product_post (item_name, item_description, price, user_id, status, category_id, image_file) values (?, ?, ?, ?, ?, ?, ?)";
  const result = await db.query(sql, [
    title,
    description,
    price,
    Number(userId),
    "PENDING",
    categoryId,
    imageFile,
  ]);
};

const getUserId = async (username) => {
  const sql = "SELECT * FROM t_user WHERE user_name = ?";
  const [rows] = await db.query(sql, [username]);
  const { user_id } = rows[0];
  return user_id;
};

export default router;
