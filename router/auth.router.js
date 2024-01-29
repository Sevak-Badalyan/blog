const express = require("express");
const router = express.Router();
const { getAllAccounts, register, login, logout, deleteAccount, updateUsername, updatePassword, verifyAccessToken } = require("../controller/auth.controller");

//get all accounts
router.get("/getAllAccounts", getAllAccounts)

// User registration
router.post("/register", register);

// User login
router.post("/login", login);

// User logout
router.post("/logout", logout);

// Delete user account
router.delete("/deleteAccount/:id", deleteAccount);

// Update username
router.put("/updateUsername/:id", updateUsername);

// Update password
router.put("/updatePassword/:id", updatePassword);

// Protected route
router.get('/protected', verifyAccessToken, (req, res) => {
    try {
        res.json({ message: 'This is a protected route', userId: req.userId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in protected route" });
    }
});

module.exports = router;
