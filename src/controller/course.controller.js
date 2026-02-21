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

export const createCourse = () => { };

export const getInstructorCourses = () => { };