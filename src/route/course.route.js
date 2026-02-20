import express from "express";
import { authorize, protect } from "../middleware/auth.middleware.js";
import {
    createCourse,
    enrollInCourse,
    getAllCourses,
    getCourseById,
    getEnrolledCourses,
    getInstructorCourses,
} from "../controller/course.controller.js";
import { courseRules, validate } from "../middleware/validator.middleware.js";

const courseRoute = express();

courseRoute.get("/", protect, getAllCourses);
courseRoute.get("/my-enrolled", protect, authorize("student"), getEnrolledCourses);
courseRoute.get("/:id", protect, getCourseById);
courseRoute.post("/:id/enroll", protect, authorize("student"), enrollInCourse);
courseRoute.post("/", protect, authorize("instructor"), courseRules, validate, createCourse);
courseRoute.get("/instructor/my-courses", protect, authorize("instructor"), getInstructorCourses);

export default courseRoute;
