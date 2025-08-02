'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import socket from "@/lib/socket";

const initialUsers = [
  "user1@example.com",
  "user2@example.com",
  "user3@example.com",
];

export default function ChatPage() {
  const { userId } = useParams(); // This is the current logged-in user, e.g., user2@example.com
  const currentUser = decodeURIComponent(userId); // Handle special characters like "@"

  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState({});
  const [availableUsers, setAvailableUsers] = useState(initialUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [addUserError, setAddUserError] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    socket.connect();
    socket.emit("register", currentUser);

    socket.on("receive-message", (data) => {
      // Add message to the specific chat with the sender
      setChats((prev) => ({
        ...prev,
        [data.from]: [
          ...(prev[data.from] || []),
          { text: `${data.message}`, type: 'received', from: data.from, timestamp: Date.now() }
        ]
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    // Default to the first user that's not the current user
    const otherUsers = availableUsers.filter((u) => u !== currentUser);
    setSelectedRecipient(otherUsers[0] || "");
  }, [currentUser, availableUsers]);

  const sendMessage = () => {
    if (!message.trim() || !selectedRecipient) return;

    socket.emit("send-message", {
      to: selectedRecipient,
      message,
    });

    // Add message to the specific chat with the recipient
    setChats((prev) => ({
      ...prev,
      [selectedRecipient]: [
        ...(prev[selectedRecipient] || []),
        { text: message, type: 'sent', to: selectedRecipient, timestamp: Date.now() }
      ]
    }));

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleAddUser = () => {
    setAddUserError("");
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserEmail)) {
      setAddUserError("Please enter a valid email address");
      return;
    }

    // Check if user already exists
    if (availableUsers.includes(newUserEmail)) {
      setAddUserError("User already exists in your contacts");
      return;
    }

    // Check if trying to add themselves
    if (newUserEmail === currentUser) {
      setAddUserError("You cannot add yourself as a contact");
      return;
    }

    // Add the new user
    setAvailableUsers(prev => [...prev, newUserEmail]);
    setNewUserEmail("");
    setShowAddUser(false);
    setAddUserError("");
  };

  const handleAddUserKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddUser();
    }
  };

  // Get current chat messages for selected recipient
  const currentChat = chats[selectedRecipient] || [];

  // Get list of users with active chats
  const activeChats = Object.keys(chats).filter(user => chats[user].length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Sidebar - Chat List */}
        <div className="w-80 bg-gray-50 border-r flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 bg-gray-100 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-800">Chats</h2>
                <p className="text-xs text-gray-600">Logged in as {currentUser}</p>
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                title="Add new contact"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Add User Modal */}
          {showAddUser && (
            <div className="p-4 bg-white border-b border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Add New Contact</h3>
              <div className="space-y-2">
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  onKeyPress={handleAddUserKeyPress}
                  placeholder="Enter email address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                {addUserError && (
                  <p className="text-red-500 text-xs">{addUserError}</p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddUser}
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddUser(false);
                      setNewUserEmail("");
                      setAddUserError("");
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-400 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Available Users */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Available Users ({availableUsers.filter(u => u !== currentUser).length})
              </h3>
              {availableUsers
                .filter((user) => user !== currentUser)
                .map((user) => {
                  const hasMessages = chats[user] && chats[user].length > 0;
                  const lastMessage = hasMessages ? chats[user][chats[user].length - 1] : null;
                  
                  return (
                    <div
                      key={user}
                      onClick={() => setSelectedRecipient(user)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                        selectedRecipient === user
                          ? 'bg-blue-100 border-2 border-blue-300'
                          : 'bg-white hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {user.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.split('@')[0]}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {lastMessage ? 
                              (lastMessage.type === 'sent' ? `You: ${lastMessage.text}` : lastMessage.text)
                              : 'No messages yet'
                            }
                          </p>
                        </div>
                        {hasMessages && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              
              {availableUsers.filter(u => u !== currentUser).length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-lg mb-2">👥</div>
                  <p className="text-gray-500 text-sm">No contacts yet</p>
                  <p className="text-gray-400 text-xs">Click the + button to add someone</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  {selectedRecipient ? selectedRecipient.split('@')[0] : 'Select a chat'}
                </h1>
                <p className="text-blue-100 text-sm">
                  {selectedRecipient ? `Chatting with ${selectedRecipient}` : 'Choose someone to chat with'}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Display */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {currentChat.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-lg mb-2">💬</div>
                <p className="text-gray-500">
                  {selectedRecipient ? 
                    `No messages with ${selectedRecipient.split('@')[0]} yet. Start the conversation!` :
                    'Select a user to start chatting'
                  }
                </p>
              </div>
            ) : (
              currentChat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                      msg.type === 'sent'
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex space-x-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={selectedRecipient ? "Type your message..." : "Select a user first..."}
                disabled={!selectedRecipient}
                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim() || !selectedRecipient}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-medium"
              >
                <span>Send</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            {selectedRecipient && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • {currentChat.length} messages in this chat
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}