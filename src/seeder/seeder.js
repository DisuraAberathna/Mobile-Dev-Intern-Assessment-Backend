import mongoose from "mongoose";
import connect from "../config/database.config.js";
import User from "../model/user.model.js";
import Course from "../model/course.model.js";
import users from "./user.seeder.js";
import coursesData from "./course.seeder.js";

const seeder = async () => {
    try {
        await connect();

        await User.deleteMany({});
        await Course.deleteMany({});
        console.log("Existing data cleared.");
        const createdUsers = await User.insertMany(users);
        console.log(`${createdUsers.length} users seeded.`);

        const instructors = createdUsers.filter(user => user.role === "instructor");

        if (instructors.length === 0) {
            console.warn("No instructors found in user seeder. Courses will not be seeded.");
        } else {
            const seededCourses = coursesData.map((course, index) => ({
                ...course,
                instructor: instructors[index % instructors.length]._id
            }));

            await Course.insertMany(seededCourses);
            console.log(`${seededCourses.length} courses seeded and assigned to instructors.`);
        }

        console.log("Data seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error while processing seeding data:", error);
        process.exit(1);
    }
};

seeder();
