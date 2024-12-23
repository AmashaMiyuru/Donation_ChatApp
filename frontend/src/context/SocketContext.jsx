import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import useConversation from "../zustand/useConversation"; // Import your Zustand store

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
	const { setMessages } = useConversation(); // Get setMessages from Zustand store

	useEffect(() => {
		if (authUser) {
			const socket = io("http://127.0.0.1:3000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Listen for new messages
			socket.on("newMessage", (message) => {
				setMessages((prevMessages) => [...prevMessages, message]); // Update messages in Zustand store
			});

			return () => {
				socket.off("getOnlineUsers"); // Clean up listener
				socket.off("newMessage"); // Clean up listener
				socket.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser, setMessages]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};






// This code is a Socket.IO-based context provider for managing real-time WebSocket connections and online user states in a React application. Here's an explanation of the functionality, line by line:

// 1. Import Statements
// javascript
// Copy code
// import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";
// import useConversation from "../zustand/useConversation"; // Import your Zustand store
// createContext / useContext: Used to create and consume the SocketContext.
// useState / useEffect: React hooks for managing state and lifecycle behavior.
// useAuthContext: Custom hook to retrieve the authenticated user data from AuthContext.
// io: The client-side Socket.IO library for WebSocket communication.
// useConversation: A Zustand (state management library) hook, likely managing chat-related data, including messages.
// 2. Context Creation
// javascript
// Copy code
// const SocketContext = createContext();
// SocketContext: A context object to store and share WebSocket-related data (like the socket instance and online users) across components.
// 3. Custom Hook
// javascript
// Copy code
// export const useSocketContext = () => {
// 	return useContext(SocketContext);
// };
// useSocketContext: A custom hook for easier access to the SocketContext values.
// 4. Context Provider
// javascript
// Copy code
// export const SocketContextProvider = ({ children }) => {
// 	const [socket, setSocket] = useState(null);
// 	const [onlineUsers, setOnlineUsers] = useState([]);
// 	const { authUser } = useAuthContext();
// 	const { setMessages } = useConversation(); // Get setMessages from Zustand store
// SocketContextProvider: A component that provides the SocketContext values (socket and onlineUsers).
// socket:
// Represents the active WebSocket connection.
// Initially null, gets set when a connection is established.
// onlineUsers:
// Stores a list of currently online users received from the server.
// authUser:
// Retrieved from the authentication context, it determines the current user's identity.
// setMessages:
// A Zustand function to update the chat messages in the application state.
// 5. Establishing the Socket Connection
// javascript
// Copy code
// useEffect(() => {
// 	if (authUser) {
// 		const socket = io("http://127.0.0.1:3000", {
// 			query: { userId: authUser._id },
// 		});

// 		setSocket(socket);
// Effect Trigger: Runs whenever authUser changes.
// Connection Setup:
// Connects to the Socket.IO server at http://127.0.0.1:3000.
// Passes the current user's ID (authUser._id) as a query parameter to the server.
// 6. Online Users Listener
// javascript
// Copy code
// socket.on("getOnlineUsers", (users) => {
// 	setOnlineUsers(users);
// });
// getOnlineUsers: A WebSocket event that sends the list of currently online users.
// setOnlineUsers(users): Updates the local state with the list of online users.
// 7. New Message Listener
// javascript
// Copy code
// socket.on("newMessage", (message) => {
// 	setMessages((prevMessages) => [...prevMessages, message]);
// });
// newMessage: A WebSocket event that sends a new chat message.
// setMessages: Updates the Zustand store by appending the new message to the existing messages.
// 8. Cleanup
// javascript
// Copy code
// return () => {
// 	socket.off("getOnlineUsers");
// 	socket.off("newMessage");
// 	socket.close();
// };
// Removes all listeners (off) and closes the WebSocket connection when the component unmounts or authUser changes.
// 9. Handling No Authenticated User
// javascript
// Copy code
// } else {
// 	if (socket) {
// 		socket.close();
// 		setSocket(null);
// 	}
// }
// If authUser is null (e.g., the user logs out), the socket connection is closed, and the state is reset.
// 10. Providing Context Values
// javascript
// Copy code
// return (
// 	<SocketContext.Provider value={{ socket, onlineUsers }}>
// 		{children}
// 	</SocketContext.Provider>
// );
// SocketContext.Provider:
// Makes socket and onlineUsers accessible to all child components wrapped by the provider.
// Key Functionality
// Manages WebSocket Connection: Automatically connects and disconnects the socket based on the authUser state.
// Tracks Online Users: Updates the list of online users using the getOnlineUsers event.
// Handles Messages: Listens for new messages and updates the Zustand store.
// Usage Example
// Wrap your app in SocketContextProvider:

// jsx
// Copy code
// <SocketContextProvider>
// 	<App />
// </SocketContextProvider>
// Access socket and online users in a component:

// javascript
// Copy code
// import { useSocketContext } from "./path/to/SocketContext";

// const Component = () => {
// 	const { socket, onlineUsers } = useSocketContext();

// 	return (
// 		<div>
// 			<p>Online Users: {onlineUsers.length}</p>
// 		</div>
// 	);
// };