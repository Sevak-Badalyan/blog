const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../model/auth.model");
const dotenv = require('dotenv');
dotenv.config();

const secret_key = process.env.secret_key;
const access_secret_key = process.env.access_secret_key;
const refresh_token_password = process.env.refresh_token_password;

async function getAllAccounts(req, res, next) {
    try {
        const accounts = await Auth.find({}, 'username password _id');
        const formattedAccounts = accounts.map(account => ({
            username: account.username,
            password: account.password,
            _id: account._id,
        }));

        res.status(200).json(formattedAccounts);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

async function register(req, res, next) {
    try {
        const { username, password } = req.body;

        const existingUsername = await Auth.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const existingPassword = await Auth.findOne({ password });
        if (existingPassword) {
            return res.status(400).json({ message: "Password already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 6);

        const newUser = new Auth({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function login(req, res, next) {
    try {
        const { username, password } = req.body;

        const user = await Auth.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ user: { id: user._id, username: user.username } }, secret_key, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true })

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function logout(req, res, next) {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

async function deleteAccount(req, res, next) {
    try {
        const { id } = req.params;
        await Auth.findByIdAndDelete(id);

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

async function updateUsername(req, res, next) {
    try {
        const { id } = req.params;
        const newUsername = req.body.newUsername;
        await Auth.findByIdAndUpdate(id, { username: newUsername });

        res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

async function updatePassword(req, res, next) {
    try {
        const { id } = req.params;
        const newPassword = req.body.newPassword;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await Auth.findByIdAndUpdate(id, { password: hashedPassword });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

async function verifyAccessToken(req, res, next) {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const accessToken = token.split(' ')[1];

        if (!accessToken) {
            return res.status(401).json({ message: 'Access Token not provided' });
        }

        jwt.verify(accessToken, access_secret_key, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid Access token' });
            }

            req.userId = decoded.userId;
        });
    } catch (error) {
        next(error);
    }
}

async function verifyRefreshToken(req, res, next) {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'Refresh Token not provided' });
        }

        jwt.verify(token, refresh_token_password, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid Refresh token' });
            }

            req.userId = decoded.userId;
        });
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { getAllAccounts, register, login, logout, deleteAccount, updateUsername, updatePassword, verifyAccessToken, verifyRefreshToken };
