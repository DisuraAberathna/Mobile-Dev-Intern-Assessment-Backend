import bcrypt from "bcryptjs";

const users = [
    {
        name: "John Instructor",
        username: "instructor1@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "Sarah Teacher",
        username: "instructor2@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "Michael Smith",
        username: "instructor3@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "Emma Wilson",
        username: "instructor4@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "David Brown",
        username: "instructor5@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "Lisa Garcia",
        username: "instructor6@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "James Miller",
        username: "instructor7@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "Patricia Davis",
        username: "instructor8@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "Robert Taylor",
        username: "instructor9@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    },
    {
        name: "Jennifer Moore",
        username: "instructor10@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "instructor"
    }
];

export default users;