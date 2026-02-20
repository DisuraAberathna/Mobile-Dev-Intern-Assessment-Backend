import dotenv from "dotenv";
import transporter from "../config/nodemailer.config.js";

dotenv.config();

const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `Course App <${process.env.MAIL_FROM}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Email error:", error);
        throw new Error("Email sending failed");
    }
};

export default sendEmail;