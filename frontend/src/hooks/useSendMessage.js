import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;


// The useSendMessage hook you've shared is responsible for sending a new message in a conversation. Here's a breakdown of the functionality:

// Code Breakdown
// 1. Imports
// javascript
// Copy code
// import { useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";
// useState: React hook for managing the loading state while the message is being sent.
// useConversation: A custom hook that gives access to the current conversation, selected messages, and a method to update messages stored in Zustand.
// toast: A utility for displaying toast notifications, used here to show errors if any occur.
// 2. useSendMessage Hook
// javascript
// Copy code
// const useSendMessage = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();
// loading: This state tracks whether the message sending process is in progress.
// messages: Accesses the current list of messages from the useConversation hook.
// setMessages: Function to update the list of messages in the Zustand store.
// selectedConversation: The conversation that the user is currently engaging with.
// 3. sendMessage Function
// javascript
// Copy code
// const sendMessage = async (message) => {
// 	setLoading(true);
// 	try {
// 		const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ message }),
// 		});
// 		const data = await res.json();
// 		if (data.error) throw new Error(data.error);

// 		setMessages([...messages, data]);
// 	} catch (error) {
// 		toast.error(error.message);
// 	} finally {
// 		setLoading(false);
// 	}
// };
// sendMessage: This function is triggered when a new message is sent.
// setLoading(true): Sets the loading state to true, indicating the message is being sent.
// fetch(/api/messages/send/${selectedConversation._id}, {...}): Sends a POST request to the server with the new message to the specific conversation (selectedConversation._id).
// await res.json(): Waits for the response from the server after the message is sent, expecting a JSON object.
// if (data.error): If the response contains an error, it throws an exception with the error message.
// setMessages([...messages, data]): Updates the list of messages in the Zustand store with the newly sent message.
// toast.error(error.message): If there is an error, a toast notification is shown to the user with the error message.
// finally { setLoading(false) }: Regardless of success or failure, the loading state is set back to false, indicating that the operation is complete.
// 4. Return Values
// javascript
// Copy code
// return { sendMessage, loading };
// sendMessage: The function that will be called to send a new message.
// loading: A state indicating whether the message is being sent or not. This can be used in a component to show a loading spinner or disable the send button while the message is being sent.
// Usage Example
// The useSendMessage hook can be used in a component where the user sends messages in a conversation. Here's an example:

// javascript
// Copy code
// import React, { useState } from "react";
// import useSendMessage from "../hooks/useSendMessage";

// const SendMessageForm = () => {
// 	const [message, setMessage] = useState("");
// 	const { sendMessage, loading } = useSendMessage();

// 	const handleSendMessage = async () => {
// 		if (message.trim()) {
// 			await sendMessage(message);
// 			setMessage(""); // Clear the message input after sending
// 		}
// 	};

// 	return (
// 		<div>
// 			<input
// 				type="text"
// 				value={message}
// 				onChange={(e) => setMessage(e.target.value)}
// 				disabled={loading}
// 			/>
// 			<button onClick={handleSendMessage} disabled={loading || !message.trim()}>
// 				{loading ? "Sending..." : "Send"}
// 			</button>
// 		</div>
// 	);
// };

// export default SendMessageForm;
// Key Points
// Message Sending: The sendMessage function makes a POST request to the server to send the message to the currently selected conversation.
// Loading State: The loading state is used to disable the send button or show a loading message while the request is in progress.
// Error Handling: If an error occurs during the message sending process (e.g., network issues, server errors), it is caught and displayed as a toast notification using the react-hot-toast library.
// State Update: After a message is successfully sent, the list of messages is updated in the Zustand store, ensuring that the UI reflects the newly sent message.
// This hook encapsulates the logic for sending a message and handling potential errors, and it makes it easy to integrate with other parts of the application.