import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import Course from "../model/course.model.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getRecommendations = async (req, resp) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return resp
                .status(400)
                .json({ message: "Please provide a career goal or interest." });
        }

        const availableCourses = await Course.find({}, "title description");
        const courseContext = availableCourses
            .map(
                (c) => `ID: ${c._id}, Title: ${c.title}, Description: ${c.description}`,
            )
            .join("\n");


        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: `You are an academic advisor. Based on the list of courses below, recommend the most relevant ones to the student's goal. 
      Return only the IDs of the recommended courses in a valid JSON array format like: {"ids": ["id1", "id2"]}.
      
      Student Goal: "${prompt}"
      
      Available Courses:
      ${courseContext}`,
        });

        const responseText = result.text();
        const recommendedData = JSON.parse(responseText.replace(/```json|```/g, ""),);

        const recommendations = await Course.find({ _id: { $in: recommendedData.ids }, }).populate("instructor", "username");

        return resp.status(200).json({ message: "Recommended courses successfully retrieved!", recommendations, });
    } catch (error) {
        console.log("Get recommended courses failed : ", error);
        return resp
            .status(500)
            .json({ message: "Server error, Get recommended courses failed!" });
    }
};
