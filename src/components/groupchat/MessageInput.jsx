import React from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import './MessageInput.css';

const MessageInput = ({ value, onChangeText, onSendMessage }) => {
  const handleInputChange = (e) => {
    onChangeText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message-text-input"
        placeholder="Escribe un mensaje"
        value={value}
        onChange={handleInputChange}
      />
      <button type="button" className="attach-button" aria-label="Adjuntar">
        <FaPaperclip />
      </button>
      <button type="submit" className="send-button" aria-label="Enviar">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageInput;