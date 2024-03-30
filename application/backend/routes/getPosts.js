import express from 'express';
import db from '../conf/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM t_product_post');
        res.json(results);

        // NOTE: Does not send image data. Client will need to make a separate request to get image data.
    } catch (err) {
        res.status(500).send('Error retrieving posts from database');
    }
});

export default router;