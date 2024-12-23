import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;





// The Messages component is responsible for displaying the list of messages in a chat application. Here’s a breakdown of its functionality:

// 1. Imports
// javascript
// Copy code
// import { useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import Message from "./Message";
// import useListenMessages from "../../hooks/useListenMessages";
// useEffect: A React hook that handles side effects in the component, such as scrolling to the last message when new messages arrive.
// useRef: A React hook used to reference DOM elements, here it is used to keep track of the last message for auto-scrolling.
// useGetMessages: A custom hook that retrieves the list of messages (and their loading status).
// MessageSkeleton: A skeleton loader component used to show a placeholder while messages are loading.
// Message: The component that displays a single message.
// useListenMessages: A custom hook that likely listens for new incoming messages (e.g., via WebSockets or a similar real-time messaging solution).
// 2. Component Setup
// javascript
// Copy code
// const { messages, loading } = useGetMessages();
// useListenMessages();
// const lastMessageRef = useRef();
// messages: The list of messages fetched from the useGetMessages hook.
// loading: A boolean value indicating whether the messages are still being loaded.
// useListenMessages(): This hook likely listens for real-time updates, such as new messages arriving, and automatically updates the messages list when new messages are received.
// lastMessageRef: A reference to the last message DOM element, used to scroll to the bottom when new messages are added.
// 3. useEffect for Auto-scrolling
// javascript
// Copy code
// useEffect(() => {
// 	setTimeout(() => {
// 		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, 100);
// }, [messages]);
// This useEffect hook runs whenever the messages array is updated.
// The setTimeout ensures that the last message is scrolled into view 100 milliseconds after the messages array changes. This is helpful to avoid issues with timing when the messages are loaded asynchronously.
// lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }): This scrolls the last message into view with a smooth scrolling effect.
// 4. Rendering the Messages
// javascript
// Copy code
// return (
// 	<div className='px-4 flex-1 overflow-auto'>
// 		{!loading &&
// 			messages.length > 0 &&
// 			messages.map((message) => (
// 				<div key={message._id} ref={lastMessageRef}>
// 					<Message message={message} />
// 				</div>
// 			))}
// 		{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
// 		{!loading && messages.length === 0 && (
// 			<p className='text-center'>Send a message to start the conversation</p>
// 		)}
// 	</div>
// );
// The component renders the list of messages inside a div container.
// {!loading && messages.length > 0 && messages.map((message) => (...)}: If messages are not loading and there are messages available, it maps over the messages array and renders each message using the Message component.
// Each message is wrapped in a div with a unique key (based on message._id), and the lastMessageRef is applied to each message to ensure the last one can be scrolled into view.
// {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}: If the messages are loading, it renders three MessageSkeleton components to display a loading placeholder while the actual messages are fetched.
// {!loading && messages.length === 0 && <p>Send a message to start the conversation</p>}: If there are no messages and loading is complete, it displays a prompt telling the user to send a message to start the conversation.
// 5. CSS Classes
// px-4: Padding on the left and right.
// flex-1: Ensures the message container takes up the available height and width.
// overflow-auto: Allows the container to scroll if the content overflows.
// Summary
// The Messages component is responsible for fetching, displaying, and updating messages in the chat.
// It listens for new messages in real-time, renders message skeletons while loading, and scrolls the chat view to the bottom whenever a new message arrives.
// It ensures a smooth user experience by providing visual loading states and automatic scrolling to the latest message.






