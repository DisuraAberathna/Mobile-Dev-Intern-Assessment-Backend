import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const register = async (req, resp) => {
    try {
        const { name, username, password, role } = req.body;

        const foundUser = await User.findOne({ username });

        if (foundUser) {
            return resp.status(409).json({ message: "User already exists with this email address!" });
        }

        const hashedPassword = bcrypt.hash(password, 10);

        const user = new User({
            name,
            username,
            password: hashedPassword,
            role
        })

        await user.save();

        const token = generateToken(user._id, user.role);

        return resp.status(201).json({ message: "User registration successful", token })
    } catch (error) {
        console.log("Registration failed : ", error);
        return resp.status(500).json({ message: "Server error, Registraion failed!" });
    }
};

export const login = () => { };

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, secret, { expiresIn: '30d' });
};