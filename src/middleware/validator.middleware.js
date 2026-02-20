import { body, validationResult } from "express-validator";

export const validate = async (req, resp, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty) {
        return next();
    }

    return resp.status(400).json({ errors: errors.array() });
};

export const registerRules = [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
    body("role").isIn(["student", "instructor"]).withMessage("Invalid role"),
];

export const courseRules = [
    body("title").notEmpty().withMessage("Course title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("content").notEmpty().withMessage("Course content is required"),
];