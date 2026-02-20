import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const protect = async (req, resp, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return resp.status(401).json({ message: "Auth token missing" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Auth validation failed : ", error);
        return resp.status(401).json({ message: "Invalid or expired token" });
    }
};

export const authorize = (...roles) => {
    return (req, resp, next) => {
        if (!roles.includes(req.user.role)) {
            return resp.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
        }

        next();
    };
};