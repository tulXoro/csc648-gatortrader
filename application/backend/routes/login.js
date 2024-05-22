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
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check password
    const loginUser = users[0];

    const { password: hashedPassword, user_id } = loginUser;
    const isPasswordMatch = bcrypt.compareSync(password, hashedPassword);
    if (!isPasswordMatch) {
      console.log("Passwords do not match");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Debugging session user
    console.log("Session user:", (req.session.user = { id: user_id }));

    //set session user
    req.session.user = { id: user_id, username: userName };
    console.log("Session user set:", req.session.user);
    res.status(200).json({
      // this shows a red alert
      message: `Log in successful.`,
      userId: user_id,
      userName: userName,
    });
  } catch (err) {
    res.status(500).send("Error in login." + err);
  }
});

router.get("/status", (req, res) => {
  if (req.session.user) {
    res.json({
      isLoggedIn: true,
      username: req.session.user.username,
      userId: req.session.user.id,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

export default router;
