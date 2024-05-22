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
        const userId = req.session.user.id;
        const sql = "SELECT u.first_name, u.last_name, p.* FROM t_product_post p join t_user u ON p.user_id = u.user_id WHERE p.user_id = ?";
        const [rows] = await db.query(sql, [userId]);

        res.json(rows);
    } catch (err) {

        res.status(500).send("Error retrieving seller posts from database" + err);
    }
});

export default router;
