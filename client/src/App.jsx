import { useState } from "react";
import "./App.css";
import sendImg from "./assets/send.svg";
import botImg from "./assets/bot.svg";
import userImg from "./assets/user.svg";

function App() {
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChatLog = [...chatLog, { user: "me", message: `${input}` }];
    setChatLog(newChatLog);
    setInput("");
    const messages = newChatLog.map((result) => result.message).join("\n");
    const response = await fetch("https://speed-code-ai.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
      }),
    });
    const data = await response.json();
    const gptRes = data.message.trim();
    setChatLog([...newChatLog, { user: "gpt", message: `${gptRes}` }]);
  };
  return (
    <div id="app">
      <div id="chat_container">
        {chatLog.map((result, index) => (
          <ChatMessage key={index} result={result} />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          name="prompt"
          rows="1"
          cols="1"
          placeholder="Ask SpeedCode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="submit">
          <img src={sendImg} alt="send" />
        </button>
      </form>
    </div>
  );
}

const ChatMessage = ({ result }) => {
  return (
    <div className={`wrapper ${result.user === "gpt" && "ai"}`}>
      <div className="chat">
        <div className="profile">
          <img src={`${result.user === "gpt" ? botImg : userImg}`} />
        </div>
        <div className="message">{result.message}</div>
      </div>
    </div>
  );
};

export default App;
