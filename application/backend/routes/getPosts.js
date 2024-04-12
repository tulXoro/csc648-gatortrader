import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    if (category && search) {
      const sql = `SELECT * FROM t_product_post WHERE
                      category_id = ? AND
                      (item_name LIKE '%${search}%' OR item_description LIKE '%${search}%') AND status = 'APPROVED'`;
      const [rows] = await db.query(sql, [category]);
      res.json(rows);
    }
    // when we receive a request to query by category
    else if (category) {
      const [rows] = await db.query("SELECT * FROM t_product_post WHERE category_id = ? AND status = 'APPROVED'", [category]);
      res.json(rows);
    }
    else if (search) {
      const sql = `SELECT * FROM t_product_post WHERE (item_name LIKE '%${search}%' OR item_description LIKE '%${search}%')
                      AND status = 'APPROVED'`;
      const [rows] = await db.query(sql);
      res.json(rows);
    } else {
      const [rows] = await db.query("SELECT * FROM t_product_post WHERE status = 'APPROVED'");
      res.json(rows);
    }

    // NOTE: Does not send image data. Client will need to make a separate request to get image data.
  } catch (err) {
    res.status(500).send("Error retrieving posts from database" + err);
  }
});

export default router;
