import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '../components/groupchat/ChatHeader';
import PartyInfoHeader from '../components/groupchat/PartyInfoHeader';
import MessageList from '../components/groupchat/MessageList';
import MessageInput from '../components/groupchat/MessageInput';
import BottomNavBar from '../components/futbol/BottomNavBar';
import '../styles/GroupChatScreen.css';

const GroupChatScreen = ({ eventData, currentUser, onNavigateBack }) => {
  const initialMessages = [
    { id: 'sys1', type: 'system', text: 'Te uniste al grupo' },
    { id: 'm1', userId: 'user2', userName: 'David Restrepo', text: 'Bueno muchachos, el partido a las 6 entonces.', avatar: 'https://via.placeholder.com/40?text=DR' },
    { id: 'm2', userId: 'user3', userName: 'David Restrepo', text: 'Listo pa de una.', avatar: 'https://via.placeholder.com/40?text=DR' },
    { id: 'm3', userId: 'user4', userName: 'Tito el Mago', text: '...', avatar: 'https://via.placeholder.com/40?text=TM', isTyping: true },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const partyName = eventData?.partyName || "PARTIDINI";
  const participants = eventData?.participants || ["David Restrepo", "Tito el mago", "Carlos el Goles", "Andres..."];
  const currentUserId = currentUser?.id || "user1";
  const currentUserName = currentUser?.name || "Tú";
  const currentUserAvatar = currentUser?.avatar || "https://via.placeholder.com/40?text=YO";


  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages(prevMessages => prevMessages.map(msg => ({ ...msg, isTyping: false })));

    const messageToSend = {
      id: `m${Date.now()}`,
      userId: currentUserId,
      userName: currentUserName,
      text: newMessage,
      avatar: currentUserAvatar,
    };
    setMessages(prevMessages => [...prevMessages, messageToSend]);
    setNewMessage('');
  };

  return (
    <div className="group-chat-screen-container">
      <ChatHeader title="CHAT DE GRUPO" onBack={onNavigateBack} />
      <PartyInfoHeader partyName={partyName} participants={participants} />
      <main className="group-chat-main-content">
        <MessageList messages={messages} currentUserId={currentUserId} />
      </main>
      <MessageInput
        value={newMessage}
        onChangeText={setNewMessage}
        onSendMessage={handleSendMessage}
      />
      <BottomNavBar onNavigate={onNavigateBack} />
    </div>
  );
};

export default GroupChatScreen;