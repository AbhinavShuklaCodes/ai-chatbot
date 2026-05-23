require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai").default;

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    const completion =
      await client.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],

      });

    res.json({
      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});