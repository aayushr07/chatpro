import React, { useEffect, useRef } from 'react';
import { Phone, Video, MoreVertical, Check, CheckCheck } from 'lucide-react';

const ChatBox = ({ activeContact, messages, onStartCall, onStartVideoCall }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (!activeContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">Select a chat to start messaging</h3>
          <p>Choose from your existing conversations or start a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
            {activeContact.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{activeContact.name}</h3>
            <p className="text-sm text-gray-500">
              {activeContact.online ? 'Online' : `Last seen ${activeContact.lastSeen || 'recently'}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={onStartCall}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button 
            onClick={onStartVideoCall}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === 'me'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <div className={`flex items-center justify-end mt-1 space-x-1 ${
                msg.sender === 'me' ? 'text-green-100' : 'text-gray-500'
              }`}>
                <span className="text-xs">{formatTime(msg.timestamp)}</span>
                {msg.sender === 'me' && (
                  <div className="text-xs">
                    {msg.read ? (
                      <CheckCheck className="w-4 h-4 text-blue-300" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;