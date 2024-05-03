import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM t_category");
        res.json(rows);
    } catch (err) {
        res.status(500).send("Error retrieving posts from database" + err);
    }
});

export default router;
