import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("sendMessage", ({ receiverId, message }) => {
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", { senderId: userId, message });
		}
	});
	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };





// 1. Importing Required Modules
// javascript
// Copy code
// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// Server from "socket.io": Imports the Server class from the socket.io library. This is used to create a WebSocket server that will handle real-time communication (like messaging) between clients and the server.
// http: This is the built-in Node.js module for creating HTTP servers. It is used to create a server that can handle both regular HTTP requests and WebSocket connections.
// express: Imports the express library, which is used to set up a web server and handle routing, but it's not heavily used in this particular code other than to initialize the app.
// 2. Initializing Express and HTTP Server
// javascript
// Copy code
// const app = express();

// const server = http.createServer(app);
// app: Creates an Express application instance. Express is typically used for building HTTP APIs or serving frontend assets, but in this case, it's primarily used to set up the HTTP server.
// server: Creates an HTTP server using the http.createServer() method, passing the Express app as the request handler. This server will handle both HTTP requests and WebSocket connections.
// 3. Setting Up Socket.IO Server
// javascript
// Copy code
// const io = new Server(server, {
// 	cors: {
// 		origin: ["http://localhost:3000"],
// 		methods: ["GET", "POST"],
// 	},
// });
// io: Initializes the Socket.IO server (io) with the HTTP server (server). The cors options are used to configure Cross-Origin Resource Sharing (CORS), allowing the frontend (running on http://localhost:3000) to communicate with this server.
// origin: Defines which domains are allowed to connect to this server. In this case, it's only http://localhost:3000, likely the frontend application.
// methods: Specifies the HTTP methods allowed for CORS requests (GET and POST in this case).
// 4. Helper Function to Get Receiver's Socket ID
// javascript
// Copy code
// export const getReceiverSocketId = (receiverId) => {
// 	return userSocketMap[receiverId];
// };
// getReceiverSocketId: This helper function takes the receiverId (the ID of the user you want to send a message to) and returns the corresponding socket ID from userSocketMap.
// 5. Mapping User IDs to Socket IDs
// javascript
// Copy code
// const userSocketMap = {}; // {userId: socketId}
// userSocketMap: An object that maps each user’s userId to their corresponding socket.id. This is used to look up which socket is associated with a specific user for sending real-time messages.
// 6. Handling WebSocket Connections
// javascript
// Copy code
// io.on("connection", (socket) => {
// 	console.log("a user connected", socket.id);
// io.on("connection", callback): This listens for new WebSocket connections. The callback function is executed each time a new client connects to the server. The socket object represents the WebSocket connection for the newly connected client.
// socket.id: This is a unique identifier assigned to the connected client. It can be used to send messages to this specific client.
// 7. Storing User's Socket ID
// javascript
// Copy code
// const userId = socket.handshake.query.userId;
// if (userId != "undefined") userSocketMap[userId] = socket.id;
// socket.handshake.query.userId: This accesses the query parameter userId from the WebSocket connection request (sent by the client). It's assumed that the client sends the userId when connecting.
// userSocketMap[userId] = socket.id: Maps the user’s userId to the socket.id, so you can later find the socket associated with that user.
// 8. Broadcasting Online Users
// javascript
// Copy code
// io.emit("getOnlineUsers", Object.keys(userSocketMap));
// io.emit("getOnlineUsers", Object.keys(userSocketMap)): This sends a broadcast message (getOnlineUsers) to all connected clients, containing the list of online users (the keys of userSocketMap, which are the userIds of all currently connected users).
// 9. Listening for Messages
// javascript
// Copy code
// socket.on("sendMessage", ({ receiverId, message }) => {
// 	const receiverSocketId = getReceiverSocketId(receiverId);
// 	if (receiverSocketId) {
// 		io.to(receiverSocketId).emit("newMessage", { senderId: userId, message });
// 	}
// });
// socket.on("sendMessage", callback): This listens for the sendMessage event from the client. The event carries the receiverId (who the message is for) and the message (the message content).
// getReceiverSocketId(receiverId): Looks up the receiver's socket ID based on their receiverId in the userSocketMap.
// io.to(receiverSocketId).emit("newMessage", ...): If the receiver’s socket is found, the message is sent to the specific socket using the to() method, which directs the message to that particular client.
// 10. Handling Disconnections
// javascript
// Copy code
// socket.on("disconnect", () => {
// 	console.log("user disconnected", socket.id);
// 	delete userSocketMap[userId];
// 	io.emit("getOnlineUsers", Object.keys(userSocketMap));
// });
// socket.on("disconnect", callback): This listens for when a client disconnects from the WebSocket server.
// delete userSocketMap[userId]: When a user disconnects, their userId is removed from userSocketMap since they are no longer connected.
// io.emit("getOnlineUsers", Object.keys(userSocketMap)): Broadcasts an updated list of online users to all remaining connected clients.
// 11. Exporting Modules
// javascript
// Copy code
// export { app, io, server };
// Export: Exports the app (Express application), io (Socket.IO server), and server (HTTP server) for use in other parts of the application (such as starting the server or handling routes).
// Summary
// WebSocket Setup: The code sets up a WebSocket server using Socket.IO to allow real-time communication between clients and the server.
// User Connections: When a user connects, their userId is saved with their corresponding socket ID to a userSocketMap.
// Real-Time Messaging: Clients can send messages to other users by specifying the receiverId, and the message is sent directly to the receiver’s socket.
// User Disconnection: When a user disconnects, their socket is removed from the userSocketMap, and the list of online users is updated across all connected clients.
// Broadcasting Online Users: The list of online users is broadcast to all clients when users connect or disconnect.





