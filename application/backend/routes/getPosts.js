import express from 'express';
import db from '../conf/database.js';

const router = express.Router();

router.get('/', async (req, res) => {


    try {
        // when we receive a request to query by category
        if (req.query.category) {
            const [rows] = await db.query(`
                SELECT * FROM posts
                WHERE category = ?
            `, [req.query.category]);
            res.json(rows);
        } else {
            const [rows] = await db.query(`
                SELECT * FROM posts
            `);
            res.json(rows);
        }

        // NOTE: Does not send image data. Client will need to make a separate request to get image data.
    } catch (err) {
        res.status(500).send('Error retrieving posts from database');
    }
});

export default router;