import { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    // Send the input to the API and get the response
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();

    setMessages([...messages, { user: input, bot: data.response }]);
    setInput("");
  };

  return (
    <div>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={`User: ${msg.user}`} secondary={`Bot: ${msg.bot}`} />
          </ListItem>
        ))}
      </List>
      <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
};

export default Chat;