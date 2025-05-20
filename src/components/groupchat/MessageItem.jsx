import React from 'react';
import './MessageItem.css';

const MessageItem = ({ message, isCurrentUser }) => {
  if (message.type === 'system') {
    return (
      <div className="message-item system-message">
        <p className="message-text-system">{message.text}</p>
      </div>
    );
  }

  return (
    <div className={`message-item ${isCurrentUser ? 'current-user' : 'other-user'}`}>
      {!isCurrentUser && message.avatar && (
        <img src={message.avatar} alt={message.userName} className="message-avatar" />
      )}
      <div className="message-content">
        {!isCurrentUser && (
          <p className="message-user-name">{message.userName}</p>
        )}
        <div className={`message-bubble ${isCurrentUser ? 'bubble-current-user' : 'bubble-other-user'}`}>
          <p className="message-text">{message.text}</p>
        </div>
        {message.isTyping && <div className="typing-indicator"><span></span><span></span><span></span></div>}
      </div>
    </div>
  );
};

export default MessageItem;