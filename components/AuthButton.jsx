import React, { useState, useRef } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        {/* Emoji Button */}
        <button 
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Attachment Button */}
        <button 
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
          />
        </div>

        {/* Send/Mic Button */}
        {message.trim() ? (
          <button
            type="submit"
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button 
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  );
};

export default MessageInput;