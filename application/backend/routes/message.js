/**************************************************************
 * Class: CSC-648-03 Spring 2024
 * Team: 05
 * GitHub ID: csc648-sp24-03-team05
 * Project: SWE Final Project
 *
 * File: message.js
 * Description: API to post, get and delete message
 **************************************************************/

import express from "express";
import db from "../conf/database.js";
import { now } from "sequelize/lib/utils";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const senderId = req.session.user.id;
    const receiverId = req.body.receiver_id;
    const message = req.body.message;
    const date = now();
    const postId = req.body.post_id;

    console.log(
      `Posting message from ${senderId} to ${receiverId}: ${message}`
    );

    const sql =
      "INSERT INTO t_purchase_message (sender_id, receiver_id, message, date, post_id) values (?, ?, ?, ?, ?)";
    const result = await db.query(sql, [
      senderId,
      receiverId,
      message,
      date,
      postId,
    ]);

    console.log("Message inserted successfully:", result);
    res.status(201).json({
      message: `Your message has been sent successfully!`,
    });
  } catch (err) {
    console.error("Error posting messages from database:", err);
    res.status(500).send("Error posting messages from database... " + err);
  }
});

router.get("/", async (req, res) => {
  try {
    // console.log(req.query);
    const userId = req.session.user.id;
    const sql = "SELECT * FROM t_purchase_message WHERE receiver_id = ?";
    const [rows] = await db.query(sql, [userId]);
    // console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).send("Error getting messages from database... " + err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { messageId } = req.query;
    const sql = "DELETE FROM t_purchase_message WHERE message_id = ?";
    const result = await db.query(sql, [messageId]);

    res.status(200).json({ message: `Message is deleted successfully...` });
  } catch (err) {
    res.status(500).send("Error deleting message from database... " + err);
  }
});

export default router;
