import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;





// The provided code defines a custom hook useListenMessages that listens for new messages through a socket connection and updates the conversation state. Here's a breakdown of the functionality:

// Code Breakdown
// 1. Imports
// javascript
// Copy code
// import { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";
// import notificationSound from "../assets/sounds/notification.mp3";
// useEffect: React hook that runs side effects, such as setting up listeners.
// useSocketContext: A custom hook that provides access to the socket context, which likely contains the socket connection and other related data like online users.
// useConversation: A Zustand store hook for managing the conversation state, such as messages and setting messages in the store.
// notificationSound: The path to the sound file used for playing a notification sound when a new message is received.
// 2. Listening to Socket Events
// javascript
// Copy code
// useEffect(() => {
// 	socket?.on("newMessage", (newMessage) => {
// 		newMessage.shouldShake = true;
// 		const sound = new Audio(notificationSound);
// 		sound.play();
// 		setMessages([...messages, newMessage]);
// 	});

// 	return () => socket?.off("newMessage");
// }, [socket, setMessages, messages]);
// useEffect: The hook sets up and cleans up the socket listener for the newMessage event. It runs whenever the socket, setMessages, or messages change.

// socket?.on("newMessage", (newMessage) => {...}):

// This sets up an event listener that listens for a newMessage event from the server via the socket.
// newMessage: This is the payload (data) received from the server whenever a new message is sent.
// newMessage.shouldShake = true;: Adds a shouldShake property to the newMessage to presumably trigger a UI effect (like shaking the message notification) to alert the user that a new message has arrived.
// new Audio(notificationSound).play();: Creates a new audio object from the notificationSound file and plays it. This provides an audible alert when a new message is received.
// setMessages([...messages, newMessage]);: Updates the messages state in the Zustand store by adding the newMessage to the current list of messages.
// return () => socket?.off("newMessage");:

// This cleans up the socket listener when the component unmounts or when the socket dependency changes.
// The .off() method removes the event listener for the newMessage event to prevent memory leaks or unnecessary listeners when the component is no longer in use.
// 3. Dependencies
// javascript
// Copy code
// }, [socket, setMessages, messages]);
// socket: The socket connection from the context, which might change if the user logs in or logs out, so the hook needs to rerun whenever the socket is updated.
// setMessages: This function from the Zustand store is used to update the messages list, so the hook reruns when this changes.
// messages: The current list of messages. It's included in the dependencies to ensure the new message gets appended to the current messages. However, this could potentially cause issues with stale closures, which we'll discuss later.
// Workflow Summary
// Set Up Listener: The useEffect hook listens for the newMessage event emitted by the socket. Every time a new message is received, it triggers the event handler.
// Play Sound: When a new message is received, a notification sound is played to alert the user.
// Update Messages: The new message is added to the existing list of messages in the Zustand store by calling setMessages.
// Cleanup: When the component is unmounted or the socket changes, the event listener is cleaned up to prevent memory leaks.
// Potential Issue: Stale State
// One potential issue with the current implementation is the usage of the messages state in the dependency array and inside the event handler. Since messages is a state value, it can lead to stale closures, meaning that the messages array used inside the useEffect hook might not always reflect the most recent value.

// To prevent this, you can update the setMessages call to use a functional update, which ensures that the state update is always based on the latest state:

// javascript
// Copy code
// setMessages((prevMessages) => [...prevMessages, newMessage]);
// This ensures that setMessages always uses the most current value of messages without relying on the outdated value from the closure.

// Usage Example
// Here's how this hook might be used in a component:

// javascript
// Copy code
// import useListenMessages from "../hooks/useListenMessages";

// const ChatComponent = () => {
//   useListenMessages();

//   return (
//     <div>
//       {/* Your chat UI components here */}
//     </div>
//   );
// };

// export default ChatComponent;
// In this example, useListenMessages is called inside the component to set up the socket listener and update the conversation whenever a new message is received.

// Conclusion
// This hook is a clean and effective way to listen for new messages via WebSockets and update the UI accordingly. By playing a notification sound and triggering visual updates (like shaking messages), it enhances the user experience in real-time communication apps like chat systems. The hook also ensures that resources are cleaned up when they are no longer needed.