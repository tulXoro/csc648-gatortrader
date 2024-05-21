/**************************************************************
 * Class: CSC-648-03 Spring 2024
 * Team: 05
 * GitHub ID: csc648-sp24-03-team05
 * Project: SWE Final Project
 *
 * File: getPost.js
 * Description: API to to get all the product post or filter
 *              by category
 **************************************************************/

import express from "express";
import db from "../conf/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);

    if (!limit || limit > 30 || isNaN(limit) || limit < 1) {
      limit = 10;
    }
    if (!page || page < 1 || isNaN(page)) {
      page = 1;
    }
    const offset = (page - 1) * limit;
    if (category && search) {
      const sql = `SELECT pp.*, t.couse_number, t.professor FROM t_product_post pp left outer join t_textbook t on pp.post_id = t.post_id WHERE
                      pp.category_id = ? AND
                      (pp.item_name LIKE '%${search}%' OR pp.item_description LIKE '%${search}%') AND pp.status = 'APPROVED' LIMIT ? OFFSET ?`;
      const [rows] = await db.query(sql, [category, limit, offset]);
      res.json(rows);
    }
    // when we receive a request to query by category
    else if (category) {
      const [rows] = await db.query(
        "SELECT pp.*, t.couse_number, t.professor FROM t_product_post pp left outer join t_textbook t on pp.post_id = t.post_id WHERE pp.category_id = 1 AND pp.status = 'APPROVED' LIMIT ? OFFSET ?",
        [category]
      );
      res.json(rows);
    } else if (search) {
      const sql = `SELECT * FROM t_product_post WHERE (item_name LIKE '%${search}%' OR item_description LIKE '%${search}%')
                      AND status = 'APPROVED' LIMIT ? OFFSET ?`;
      const [rows] = await db.query(sql, [limit, offset]);
      res.json(rows);
    } else {
      const [rows] = await db.query(
        "SELECT * FROM t_product_post WHERE status = 'APPROVED' LIMIT ? OFFSET ?",
        [limit, offset]
      );
      res.json(rows);
    }

    // NOTE: Does not send image data. Client will need to make a separate request to get image data.
  } catch (err) {
    res.status(500).send("Error retrieving posts from database" + err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract user data from the request body
    // console.log(req.body);
    const { itemName, itemDescription, price, userId, status, categoryId } =
      req.body;
    const sql =
      "INSERT INTO t_product_post (item_name, item_description, price, user_id, status, category_id) values (?, ?, ?, ?, ?, ?)";
    const result = await db.query(sql, [
      itemName,
      itemDescription,
      price,
      userId,
      status,
      categoryId,
    ]);
    res.status(201).json({
      message: `Product post from userId ${userId} is created successfully...`,
    });
    console.log(result);
  } catch (err) {
    res.status(500).send("Error in create a product post..." + err);
  }
});

export default router;
