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

export const getEnrolledCourses = async (req, resp) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "enrolledCourses",
            populate: { path: "instructor", select: "name" }
        });

        if (!user) {
            return resp.status(404).json({ message: "Invalid user, can not find user with this id!" });
        }

        return resp.status(200).json({ message: "User enrolled courses successfully retrieved!", enrolledCourses: user.enrolledCourses })
    } catch (error) {
        console.log("Get enrolled courses failed : ", error);
        return resp.status(500).json({ message: "Server error, Get enrolled courses failed!" });
    }
};

export const getCourseById = async (req, resp) => {
    try {
        const course = await Course.findById(req.params.id).populate("instructor", "name");

        if (!course) {
            return resp.status(404).json({ message: "Invalid course, can not find course with this id!" });
        }

        return resp.status(200).json({ message: "Course data successfully retrieved!", course });
    } catch (error) {
        console.log("Get course by id failed : ", error);
        return resp.status(500).json({ message: "Server error, Get course by id failed!" });
    }
};

export const enrollInCourse = async (req, resp) => {
    try {
        const student = req.user.id;

        const course = await Course.findById(req.params.id);

        if (!course) {
            return resp.status(404).json({ message: "Invalid course, can not find course with this id!" });
        }

        const isAlreadyEnrolled = course.enrolledStudents.some(
            (item) => item.student.toString() === student
        );

        if (isAlreadyEnrolled) {
            return resp.status(409).json({ message: "Student already enrolled in this course!" });
        }

        course.enrolledStudents.push({ student });
        await course.save();

        await User.findByIdAndUpdate(student, {
            $push: { enrolledCourses: course._id }
        });

        const updatedCourse = await Course.findById(req.params.id).populate("instructor", "name");

        return resp.status(200).json({ message: "Student successfully enroll with course!", course: updatedCourse });
    } catch (error) {
        console.log("Student enroll to course failed : ", error);
        return resp.status(500).json({ message: "Server error, Student enroll to course failed!" });
    }
};

export const createCourse = async (req, resp) => {
    try {
        const { title, description, content } = req.body;
        const instructor = req.user.id;

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