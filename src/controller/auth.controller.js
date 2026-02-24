import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import sendEmail from "../util/mail-send.util.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const register = async (req, resp) => {
    try {
        const { name, username, password, role } = req.body;

        const foundUser = await User.findOne({ username });

        if (foundUser) {
            return resp.status(409).json({ message: "User already exists with this email address!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            username,
            password: hashedPassword,
            role
        })

        await user.save();

        await sendEmail(
            user.username,
            "Welcome to LMS",
            `<h1>Welcome, ${user.name}🎉</h1><p>Your account is created successfully.</p>`
        );

        const token = generateToken(user._id, user.role);

        return resp.status(201).json({ message: "User registration successful", token, role: user.role })
    } catch (error) {
        console.log("Registration failed : ", error);
        return resp.status(500).json({ message: "Server error, Registraion failed!" });
    }
};

export const login = async (req, resp) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return resp.status(404).json({ message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return resp.status(404).json({ message: "Invalid credentials!" });
        }

        const token = generateToken(user._id, user.role);

        return resp.status(200).json({ message: "User login successful", token, role: user.role })
    } catch (error) {
        console.log("Login failed : ", error);
        return resp.status(500).json({ message: "Server error, Login failed!" });
    }
};

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, secret, { expiresIn: '30d' });
};