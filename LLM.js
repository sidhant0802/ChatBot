import axios from "axios";
import readlineSync from "readline-sync";
import dotenv from "dotenv";

dotenv.config();

const chat = {
  model: "openai/gpt-3.5-turbo",
  history: []
};

async function sendMessage(userProblem) {

  chat.history.push({
    role: "user",
    content: userProblem
  });

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: chat.model,
      messages: chat.history
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const reply = response.data.choices[0].message.content;

  chat.history.push({
    role: "assistant",
    content: reply
  });

  return reply;
}

async function main() {

  const userProblem = readlineSync.question("Ask me anything --> ");

  if (userProblem.toLowerCase() === "exit") {
    console.log("Goodbye!");
    return;
  }

  const response = await sendMessage(userProblem);

  console.log(response);

  main();
}

main();