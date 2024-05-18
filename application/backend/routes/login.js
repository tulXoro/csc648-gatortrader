import express from "express";
import db from "../conf/database.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check userName
        const sqlUserName = "SELECT * FROM t_user WHERE user_name = ?";
        const [users] = await db.query(sqlUserName, [userName]);
        // users.forEach(user => {
        //     console.log(user);
        // })

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check password
        const loginUser = users[0];

        const { password: hashedPassword, userId } = loginUser;
        const isPasswordMatch = bcrypt.compareSync(password, hashedPassword);
        if (!isPasswordMatch) {
            console.log("Passwords do not match");
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        req.session.user = { id: userId, username: userName };
        res.status(200).json({ message: `User ${userName} is logined successfully...` });

        } catch (err) {
            res.status(500).send("Error in login..." + err);
        }
    }
);  

export default router;
