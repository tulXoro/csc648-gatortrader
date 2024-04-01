import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // when we receive a request to query by category
    if (req.query.category) {
      const [rows] = await db.query(
        `
                SELECT * FROM t_product_post
                WHERE category_id = ?
            `,
        [req.query.category]
      );
      res.json(rows);
    } else {
      const { search } = req.query;
      const sql = search ? 
        `SELECT * FROM t_product_post WHERE item_name LIKE '%${search}%' OR item_description LIKE '%${search}%'` :
        "SELECT * FROM t_product_post";
      const [rows] = await db.query(sql);
      res.json(rows);
    }

    // NOTE: Does not send image data. Client will need to make a separate request to get image data.
  } catch (err) {
    res.status(500).send("Error retrieving posts from database" + err);
  }
});

export default router;
