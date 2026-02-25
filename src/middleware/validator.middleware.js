import { body, validationResult } from "express-validator";

export const validate = async (req, resp, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return resp.status(400).json({
        errors: errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }))
    });
};

export const registerRules = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),
    body("username")
        .notEmpty().withMessage("Email address is required")
        .isEmail().withMessage("Please provide a valid email address")
        .normalizeEmail(),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),
    body("role").isIn(["student", "instructor"]).withMessage("Invalid role"),
];

export const loginRules = [
    body("username").notEmpty().withMessage("Email address is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

export const courseRules = [
    body("title").notEmpty().withMessage("Course title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("content").notEmpty().withMessage("Course content is required"),
];