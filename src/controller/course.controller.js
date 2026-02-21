import Course from "../model/course.model.js";

export const getAllCourses = async (req, resp) => {
    try {
        const courses = await Course.find().populate("instructor", "name");

        return resp.status(200).json({ courses });
    } catch (error) {
        console.log("Get all courses failed : ", error);
        return resp.status(500).json({ message: "Server error, Get all courses failed!" });

    }
};

export const getEnrolledCourses = () => { };

export const getCourseById = () => { };

export const enrollInCourse = () => { };

export const createCourse = async (req, resp) => {
    try {
        const { title, description, content } = req.body;
        const instructorId = req.user.id;

        const existingCourse = await Course.findOne({
            title: { $regex: new RegExp(`^${title}$`, "i") },
            instructor: instructorId,
        });

        if (existingCourse) {
            return resp.status(409).json({ message:"You have already created a course with this title."});
        }

        const course = new Course({
            title,
            description,
            content,
            instructor: instructorId,
        });

        await course.save();

        return resp.status(201).json({ message: "Course creation successfull", course });
    } catch (error) {
        console.log("Create course failed : ", error);
        return resp.status(500).json({ message: "Server error, Create course failed!" });
    }
};

export const getInstructorCourses = () => { };