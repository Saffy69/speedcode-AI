import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from SpeedCode!",
  });
});

app.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      message: [{ role: "user", content: message }],
    });
    res.json({
      message: response.data.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/test", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    res.json({
      message: response.data.choices[0].message.content,
    });
    console.log(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
