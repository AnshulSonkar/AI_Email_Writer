
const express = require("express");// Server.Js
const cors = require("cors");
require("dotenv").config();

console.log(
    "Gemini API key loaded:",
    Boolean(process.env.GEMINI_API_KEY)
    // AI API key is Required Here
);

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Email Writer backend is running!");
});

const PORT = 5000;


app.post("/generate-email", (req, res) => {
    const { purpose, tone } = req.body;

    if (!purpose || !purpose.trim()) {
        return res.status(400).json({
            error: "Email purpose is required"
        });
    }

    if (!tone) {
        return res.status(400).json({
            error: "Email tone is required"
        });
    }

    res.status(200).json({
        message: "Request received successfully",
        purpose: purpose,
        tone: tone
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
