/**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: getCategories.js
* Description: API to get a list of categories
**************************************************************/ 

import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        const [rows] = await db.query("SELECT * FROM t_product_post where user_id = ?", [userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).send("Error retrieving seller posts from database" + err);
    }
});

export default router;