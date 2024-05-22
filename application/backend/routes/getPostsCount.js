/**************************************************************
 * Class: CSC-648-03 Spring 2024
 * Team: 05
 * GitHub ID: csc648-sp24-03-team05
 * Project: SWE Final Project
 *
 * File: getPostsCount.js
 * Description: API to posts count with status = 'APPROVED'
 **************************************************************/

import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const postId = req.query.id;
        const sql = `SELECT count(*) as count FROM t_product_post p  WHERE p.status = 'APPROVED'`;
        const [rows] = await db.query(sql, []);

        res.json(rows[0]);
    } catch (err) {

        res.status(500).send("Error retrieving post by id from database" + err);
    }
});

export default router;
