import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

const auth = async (req, resp, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return resp.status(401).json({ message: "Auth token missing" });
    }

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return resp.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = decoded;

        next();
    });
};

export default auth;