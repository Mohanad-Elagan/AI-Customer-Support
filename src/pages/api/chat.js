import { Configuration, OpenAIApi } from "openai";
import { knowledgeBase } from "../../knowledgeBase"; // Ensure this path is correct based on your project structure

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const kbContext = knowledgeBase.find((entry) =>
    message.includes(entry.keyword)
  );

  const prompt = kbContext
    ? `${kbContext.context}\nUser: ${message}\nBot:`
    : message;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    });

    res.status(200).json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};