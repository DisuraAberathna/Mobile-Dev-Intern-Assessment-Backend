import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student',
        required: true,
        index: true,
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
}, {
    timestamps: true,
});

userSchema.index({ role: 1, createdAt: -1 });

const User = mongoose.model("User", userSchema);

export default User;