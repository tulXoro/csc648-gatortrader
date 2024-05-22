/**************************************************************
 * Class: CSC-648-03 Spring 2024
 * Team: 05
 * GitHub ID: csc648-sp24-03-team05
 * Project: SWE Final Project
 *
 * File: user.js
 * Description: API to get info by userId
 **************************************************************/

import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // console.log(req.query);
    const { userId } = req.query;
    const sql = "SELECT user_name as userName, last_name as lastName, first_name as firstName FROM t_user WHERE user_id = ?";
    const [rows] = await db.query(sql, [userId]);
    // console.log(rows);
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).send("Error getting user info from database... " + err);
  }
});

export default router;
