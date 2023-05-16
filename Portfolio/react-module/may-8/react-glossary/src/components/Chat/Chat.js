import { useState } from 'react';
import classes from './Chat.module.css';

export function Chat() {
  const [messages, setMessages] = useState([]);
  function onNewMessage(username, message) {
    const newMessages = [...messages];
    newMessages.push({ username, message });
    setMessages(newMessages);
  }
  return (
    <div className={classes.chat}>
      <h2>Chat</h2>
      <Messages messages={messages}></Messages>
      <Inputs onNewMessage={onNewMessage}></Inputs>
    </div>
  );
}

function Messages({ messages }) {
  return (
    <ol className={classes.messages}>
      {messages.map((msg, i) => (
        <Message message={msg} key={i}></Message>
      ))}
    </ol>
  );
}

function Message({ message }) {
  return (
    <li className={classes.message}>
      <span>
        <b>{message.username}</b>:
      </span>
      <span>{message.message}</span>
    </li>
  );
}

function Inputs({ onNewMessage }) {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [inputErr, setInputErr] = useState('');

  function handleClick() {
    if (username && message) {
      setInputErr('');
      onNewMessage(username, message);
      setUsername('');
      setMessage('');
    } else setInputErr('Error');
  }
  return (
    <div className={classes.inputs}>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={handleClick}>Send</button>
      <div>{inputErr}</div>
    </div>
  );
}

export default Chat;
