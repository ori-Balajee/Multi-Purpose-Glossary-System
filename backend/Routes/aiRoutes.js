const express = require('express');
const router = express.Router();
require("dotenv").config();


router.post('/genTerms', async (req, res) => {
    try {
        const { topic, count } = req.body;
        const prompt = `
        You are a professional glossary generator for a learning app.

        Generate ${count || 5} glossary terms about "${topic}".

        Return ONLY valid JSON array. No explanation. No extra text.

        Each object must follow this format:

        {
            "term": "string",
            "definition": "string",
            "difficulty": "beginner | intermediate | advanced",
            "category": "string",
            "example": "string"
        }

        Rules:
        - Keep definitions simple
        - Difficulty must be based on complexity
        - Category must relate to "${topic}"
        - Example must be a real sentence
        `;

        console.log("Hitting Hugging Face API...");
        console.log(process.env.HF_API_KEY ? "Token exists" : "No token");

        console.log("Before fetch call");

        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "meta-llama/Llama-3.1-8B-Instruct",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })
            }
        );

        console.log("After fetch call");
        console.log("HF Status:", response.status);

        const data = await response.json();
        console.log("HF Response:", data);

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Hugging Face API failed",
                details: data
            });
        }

        const generatedText =
            data.choices?.[0]?.message?.content || "";

        res.json({
            generatedText
        });
    } catch (error) {
        console.error("Server Error:", error.message);

        return res.status(500).json({
            success: false,
            error: "Internal Server Error. Please try again later."
        });
    }
});

module.exports = router;

