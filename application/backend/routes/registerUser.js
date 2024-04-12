import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Extract user data from the request body
    // console.log(req.body);
    const { userName, password, lastName, firstName, email } = req.body;
    const sql = "INSERT INTO t_user (user_name, password, last_name, first_name, email) values (?, ?, ?, ?, ?)";
    const result = await db.query(sql, [userName, password, lastName, firstName, email]);
    res.status(201).json({ message: `User ${userName} is registered successfully...` });
    console.log(result);
  } catch (err) {
    res.status(500).send("Error in registering user..." + err);
  }
});

export default router;
