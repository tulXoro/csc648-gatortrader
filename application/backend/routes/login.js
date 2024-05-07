import express from "express";
import db from "../conf/database.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check userName
        const sqlUserName = "SELECT * FROM t_user WHERE user_name = ?;";
        const resultUserName = await db.query(sqlUserName, [userName]);
        if (resultUserName[0].length === 0) {
            throw new Error("User not found");
        }

        // Check password
        const sqlPassword = "SELECT password FROM t_user WHERE user_name = ?;";
        const resultPassword = await db.query(sqlPassword, [userName]);
        const isPasswordMatch = bcrypt.compareSync(password, resultPassword[0][0].password);
        if (isPasswordMatch) {
            console.log(`successful in comparing original and hashed passwords`);
        } else {
            console.log("Passwords do not match");
            throw new Error('Passwords do not match');
        }

        res.status(201).json({ message: `User ${userName} is logined successfully...` });

        } catch (err) {
            res.status(500).send("Error in login..." + err);
        }
    }
);  

export default router;
