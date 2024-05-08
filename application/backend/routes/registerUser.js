/**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: registerUser.js
* Description: API to register new users
**************************************************************/ 

import express from "express";
import db from "../conf/database.js";
import bcrypt from "bcrypt";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Extract user data from the request body
    // console.log(req.body);
    const { userName, password, lastName, firstName, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`password: ${password}, hashedPassword: ${hashedPassword}`);
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        console.log(`error in comparing password: ${err}`);
      }
      if (result) {
        console.log(`successful in comparing original and hashed passwords: ${result}`);
      }
    })
    const sql = "INSERT INTO t_user (user_name, password, last_name, first_name, email) values (?, ?, ?, ?, ?)";
    const result = await db.query(sql, [userName, hashedPassword, lastName, firstName, email]);
    res.status(201).json({ message: `User ${userName} is registered successfully...` });
    console.log(result);
  } catch (err) {
    res.status(500).send("Error in registering user..." + err);
  }
});

export default router;
