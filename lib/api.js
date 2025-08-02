// lib/api.js
import axios from "axios";

// Create an Axios instance with base backend URL from .env
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false, // Set true if using cookies or sessions
});

// ----------------------------
// USER APIs
// ----------------------------

export const registerUser = async (userData) => {
  // POST /api/users/register
  return await API.post("/api/users/register", userData);
};

export const getUserByEmail = async (email) => {
  // GET /api/users/:email
  return await API.get(`/api/users/${email}`);
};

// ----------------------------
// MESSAGE APIs
// ----------------------------

export const sendMessageToDB = async (messageData) => {
  // POST /api/messages
  return await API.post("/api/messages", messageData);
};

export const getMessagesBetweenUsers = async (from, to) => {
  // GET /api/messages?from=user1@example.com&to=user2@example.com
  return await API.get("/api/messages", {
    params: { from, to },
  });
};

// ----------------------------
// Example: Other endpoints
// ----------------------------

// export const updateUserProfile = async (userId, updates) => {
//   return await API.put(`/api/users/${userId}`, updates);
// };

export default API;
