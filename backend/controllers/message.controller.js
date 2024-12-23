import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	console.log("Received message data:", req.body); 
  try {
    const { message } = req.body; 
    const { id: receiverId } = req.params; 
    const senderId = req.user._id; 

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);
    console.log("Received message data:", req.body);

    const file = req.file ? req.file.filename : null;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: "Message is required and must be a non-empty string." });
    }

    // Find or create conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      console.log("New conversation created");
    }

    // Create a new message with the text
    const newMessage = new Message({
      senderId,
      receiverId,
      message: message.trim(),
      filePath: file ? `/uploads/${file}` : null,
    });

    console.log("New message:", newMessage);

    // Add the message to the conversation
    conversation.messages.push(newMessage._id);

    // Save both the message and the conversation
    await Promise.all([newMessage.save(), conversation.save()]);
    console.log("Message and conversation saved");

    // Socket.IO functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Message sent via Socket.IO to:", receiverSocketId);
    }

    // Send back the new message
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    console.log("Getting messages between sender:", senderId, "and receiver:", userToChatId);

    // Find conversation between sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      console.log("No conversation found");
      return res.status(200).json([]); // No conversation yet
    }

    console.log("Found conversation with messages:", conversation.messages);

    res.status(200).json(conversation.messages); // Return the messages
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};







// This code defines two main controllers, sendMessage and getMessages, for managing messages in a chat application. Here's a detailed explanation of how they work:

// 1. sendMessage
// Purpose: Handles sending a message from one user to another.

// Detailed Steps:

// Log Incoming Data:

// Logs the incoming request body and sender/receiver IDs for debugging purposes.
// Validate Input:

// Ensures the message field exists, is a string, and is not empty. If validation fails, it returns a 400 Bad Request response.
// Find or Create Conversation:

// Checks if a conversation between the sender (senderId) and receiver (receiverId) already exists in the database using:
// javascript
// Copy code
// participants: { $all: [senderId, receiverId] }
// $all ensures both participants are part of the conversation.
// If no conversation exists, a new one is created with both participants.
// Create New Message:

// Constructs a Message document with:
// senderId: The sender’s ID (from req.user).
// receiverId: The receiver’s ID (from req.params).
// message: The message text.
// Update Conversation:

// The new message’s ID is added to the messages array of the conversation.
// Save to Database:

// Saves both the new message and the updated conversation to the database using Promise.all for concurrent saving.
// Socket.IO Integration:

// Uses a helper function getReceiverSocketId to retrieve the receiver’s active socket ID.
// If the receiver is online (receiverSocketId exists), sends the message in real-time using:
// javascript
// Copy code
// io.to(receiverSocketId).emit("newMessage", newMessage);
// Respond to Sender:

// Returns the newly created message as a JSON response with a status of 201 Created.
// Error Handling:

// Logs errors and returns a 500 Internal Server Error if something goes wrong.
// 2. getMessages
// Purpose: Retrieves all messages between two users.

// Detailed Steps:

// Log Request Data:

// Logs the sender ID (req.user._id) and the receiver ID (req.params.id) for debugging.
// Find Conversation:

// Looks for a conversation between the sender and receiver using the same $all query logic as sendMessage.
// Uses .populate("messages") to retrieve all message documents referenced in the messages array of the conversation.
// Handle No Conversation Case:

// If no conversation is found, logs this and returns an empty array with a 200 OK response.
// Return Messages:

// If a conversation exists, logs the retrieved messages and returns them as a JSON response with a 200 OK status.
// Error Handling:

// Logs errors and returns a 500 Internal Server Error if something goes wrong.
// Shared Concepts in Both Controllers
// Schema Design:

// A Conversation document has:
// An array of participants (sender and receiver).
// A messages array containing references (IDs) to Message documents.
// A Message document has:
// senderId: Sender’s user ID.
// receiverId: Receiver’s user ID.
// message: Text content.
// Socket.IO Integration:

// Enables real-time message delivery if the receiver is online.
// Error Logging:

// Uses console.error to log detailed error stacks for debugging.
// Database Queries:

// Uses Mongoose for database interactions.
// Efficiently handles relationships via references and .populate().
// Summary of Functionality
// sendMessage: Manages message creation, real-time delivery using Socket.IO, and updates to the conversation.
// getMessages: Fetches all messages in a conversation between two users, ensuring previous communication history is available.