import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useGetConversations from "../../hooks/useGetConversations";
import useSendMessage from "../../hooks/useSendMessage"; // Import the send message hook

const MessageContainer = () => {
	const { loading, conversations } = useGetConversations(); // Fetch conversations
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { sendMessage, loading: sendingLoading } = useSendMessage(); // Use sendMessage hook

	useEffect(() => {
		// Cleanup function to reset selected conversation on unmount
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	const handleSendMessage = async (formData) => {
		await sendMessage(formData);
		// You can handle any post-send actions here, like clearing inputs if needed
	};

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{loading ? (
				<p>Loading conversations...</p>
			) : !selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput onSubmit={handleSendMessage} loading={sendingLoading} /> {/* Pass the onSubmit function */}
				</>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

export default MessageContainer;






// This code is for a MessageContainer component in a React chat application. It is responsible for displaying the chat interface, including the list of conversations, the selected conversation's messages, and an input field for sending messages. Let's break down the key sections and explain their purpose:

// 1. Imports
// javascript
// Copy code
// import { useEffect } from "react";
// import useConversation from "../../zustand/useConversation";
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";
// import { TiMessages } from "react-icons/ti";
// import { useAuthContext } from "../../context/AuthContext";
// import useGetConversations from "../../hooks/useGetConversations";
// import useSendMessage from "../../hooks/useSendMessage"; // Import the send message hook
// useEffect: A React hook that is used to perform side effects in the component, such as cleaning up or running logic when the component mounts or unmounts.
// useConversation: A custom hook using Zustand (a state management library) to manage the current selected conversation and set it.
// MessageInput: A component for rendering the message input field where users can type and send messages.
// Messages: A component for displaying the list of messages in the selected conversation.
// TiMessages: An icon from the React Icons library used to represent messages.
// useAuthContext: A custom hook to access the authentication context, including information about the logged-in user.
// useGetConversations: A custom hook to fetch the list of conversations for the logged-in user.
// useSendMessage: A custom hook to handle sending messages.
// 2. MessageContainer Component
// javascript
// Copy code
// const MessageContainer = () => {
//     const { loading, conversations } = useGetConversations(); // Fetch conversations
//     const { selectedConversation, setSelectedConversation } = useConversation();
//     const { sendMessage, loading: sendingLoading } = useSendMessage(); // Use sendMessage hook

//     useEffect(() => {
//         // Cleanup function to reset selected conversation on unmount
//         return () => setSelectedConversation(null);
//     }, [setSelectedConversation]);

//     const handleSendMessage = async (formData) => {
//         await sendMessage(formData);
//         // You can handle any post-send actions here, like clearing inputs if needed
//     };

//     return (
//         <div className='md:min-w-[450px] flex flex-col'>
//             {loading ? (
//                 <p>Loading conversations...</p>
//             ) : !selectedConversation ? (
//                 <NoChatSelected />
//             ) : (
//                 <>
//                     {/* Header */}
//                     <div className='bg-slate-500 px-4 py-2 mb-2'>
//                         <span className='label-text'>To:</span>{" "}
//                         <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
//                     </div>
//                     <Messages />
//                     <MessageInput onSubmit={handleSendMessage} loading={sendingLoading} /> {/* Pass the onSubmit function */}
//                 </>
//             )}
//         </div>
//     );
// };
// Breakdown:
// State Initialization:

// loading and conversations are fetched from the useGetConversations hook. It retrieves the list of conversations and a loading state.
// selectedConversation and setSelectedConversation are fetched from useConversation to manage which conversation is currently selected.
// sendMessage and sendingLoading are fetched from the useSendMessage hook to handle sending messages and track the loading state for sending.
// useEffect Hook:

// The cleanup function in the useEffect resets the selected conversation when the component unmounts. This prevents any leftover state if the component is removed or replaced.
// handleSendMessage Function:

// This function is used to call the sendMessage hook and pass the formData (likely the message content). After sending the message, it can handle any additional actions (such as clearing the input, though this part is not explicitly implemented).
// Render Logic:

// If loading is true, it shows a loading message ("Loading conversations...").
// If no conversation is selected (!selectedConversation), it shows the NoChatSelected component.
// If a conversation is selected:
// A header section is displayed with the recipient's name (selectedConversation.fullName).
// The Messages component is rendered to display all messages within the selected conversation.
// The MessageInput component is rendered with the onSubmit function (i.e., handleSendMessage) and the loading state (sendingLoading) to handle message submission.
// 3. NoChatSelected Component
// javascript
// Copy code
// const NoChatSelected = () => {
//     const { authUser } = useAuthContext();
//     return (
//         <div className='flex items-center justify-center w-full h-full'>
//             <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
//                 <p>Welcome 👋 {authUser.fullName} ❄</p>
//                 <p>Select a chat to start messaging</p>
//                 <TiMessages className='text-3xl md:text-6xl text-center' />
//             </div>
//         </div>
//     );
// };
// Breakdown:
// This component is displayed when no conversation is selected.
// It greets the logged-in user (fetched from the useAuthContext hook) and prompts them to select a chat.
// It shows an icon (TiMessages) representing messages, along with the user's name.
// 4. Return to MessageContainer
// The MessageContainer component manages the chat interface, switching between different views based on whether a conversation is selected and whether data is loading.
// NoChatSelected is shown when no conversation is active, while the chat interface (Messages, MessageInput) is shown when a conversation is selected.
// Summary:
// The MessageContainer manages the core functionality of the chat interface, including fetching conversations, displaying the selected conversation's messages, and sending messages.
// It handles the loading state, displays a message input, and ensures the selected conversation is properly cleaned up when the component unmounts.
// The NoChatSelected component is a placeholder for when no conversation is active, guiding the user to select one.