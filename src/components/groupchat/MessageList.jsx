import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import './MessageList.css';

const MessageList = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isCurrentUser={msg.userId === currentUserId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;