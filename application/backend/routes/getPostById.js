/**************************************************************
 * Class: CSC-648-03 Spring 2024
 * Team: 05
 * GitHub ID: csc648-sp24-03-team05
 * Project: SWE Final Project
 *
 * File: getPostById.js
 * Description: API to post by id
 **************************************************************/

import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const postId = req.query.id;
        const [rows] = await db.query("SELECT * FROM t_product_post WHERE post_id = ?", [postId]);
        console.log(rows);
        console.log(postId)
        console.log(req.query)

        res.json(rows);
    } catch (err) {

        res.status(500).send("Error retrieving post by id from database" + err);
    }
});

export default router;
