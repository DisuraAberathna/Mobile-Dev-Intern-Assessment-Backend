import Course from "../model/course.model.js";
import User from "../model/user.model.js";

export const getAllCourses = async (req, resp) => {
    try {
        const courses = await Course.find().populate("instructor", "name");

        return resp.status(200).json({ message: "All course data successfully retrieved!", courses });
    } catch (error) {
        console.log("Get all courses failed : ", error);
        return resp.status(500).json({ message: "Server error, Get all courses failed!" });
    }
};

export const getEnrolledCourses = () => { };

export const getCourseById = async (req, resp) => {
    try {
        const course = await Course.findById(req.params.id).populate("instructor", "username");

        if (!course) {
            return resp.status(404).json({ message: "Invalid course, can not find course with this id!" });
        }

        return resp.status(200).json({ message: "Course data successfully retrieved!", course });
    } catch (error) {
        console.log("Get course by id failed : ", error);
        return resp.status(500).json({ message: "Server error, Get course by id failed!" });
    }
};

export const enrollInCourse = () => { };

export const createCourse = async (req, resp) => {
    try {
        const { title, description, content } = req.body;

        const instructor = await User.findById(req.user.id);

        if (!instructor) {
            return resp.status(404).json({ message: "Invalid instructor, can not find any instructor with this id!" });
        }

        const existingCourse = await Course.findOne({
            title: { $regex: new RegExp(`^${title}$`, "i") },
            instructor,
        });

        if (existingCourse) {
            return resp.status(409).json({ message: "You have already created a course with this title." });
        }

        const course = new Course({
            title,
            description,
            content,
            instructor,
        });

        await course.save();

        return resp.status(201).json({ message: "Course creation successfull", course });
    } catch (error) {
        console.log("Create course failed : ", error);
        return resp.status(500).json({ message: "Server error, Create course failed!" });
    }
};

export const getInstructorCourses = async (req, resp) => {
    try {
        const courses = await Course.find({
            instructor: req.user.id,
        });

        return resp.status(200).json({ message: "Instructor course data successfully retrieved!", courses });
    } catch (error) {
        console.log("Instructor courses loading failed : ", error);
        return resp.status(500).json({ message: "Server error, Your courses loading failed!" });
    }
};