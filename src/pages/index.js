import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Chat from '../components/Chat';
import Feedback from '../components/Feedback';
import '../i18n'; // Import the i18n configuration

export default function Home() {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();

    setMessages([...messages, { user: input, bot: data.response }]);
    setInput("");
  };

  const handleFeedbackSubmit = (rating) => {
    console.log("User feedback:", rating);
  };

  return (
    <div>
      {!session ? (
        <Button onClick={() => signIn('google')}>Sign in</Button>
      ) : (
        <>
          <Button onClick={() => signOut()}>Sign out</Button>
          <h1>{t('Welcome')} {session.user.name}</h1>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={`User: ${msg.user}`} secondary={`Bot: ${msg.bot}`} />
              </ListItem>
            ))}
          </List>
          <TextField value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={handleSend}>{t('Send')}</Button>
          <Feedback onSubmit={handleFeedbackSubmit} />
        </>
      )}
      <div>
        <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
        <Button onClick={() => i18n.changeLanguage('es')}>Español</Button>
      </div>
    </div>
  );
}