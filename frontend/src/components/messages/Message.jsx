import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;






// This code is for a Message component that is likely part of a chat application built with React. The component displays a single message within a chat interface, showing the message content, sender's profile picture, timestamp, and styling that differentiates the sender (whether the message is from the logged-in user or someone else). Let's break down the code step by step:

// 1. Imports
// javascript
// Copy code
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";
// useAuthContext: A custom hook that provides the authentication context, specifically the current logged-in user (authUser).
// extractTime: A utility function that formats the timestamp of a message into a more readable format (probably from a date object or ISO string).
// useConversation: A custom hook using Zustand, a state management library, to get the selected conversation, probably to determine the recipient's information or profile.
// 2. Component Definition (Message)
// javascript
// Copy code
// const Message = ({ message }) => {
// The component is receiving a message prop, which represents the data of the individual message to be displayed.

// 3. Destructuring and Logic
// javascript
// Copy code
// const { authUser } = useAuthContext();
// const { selectedConversation } = useConversation();
// const fromMe = message.senderId === authUser._id;
// const formattedTime = extractTime(message.createdAt);
// const chatClassName = fromMe ? "chat-end" : "chat-start";
// const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
// const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// const shakeClass = message.shouldShake ? "shake" : "";
// authUser: Extracts the logged-in user's data from the authentication context.
// selectedConversation: Extracts the currently selected conversation (likely the recipient's data, such as their profile picture).
// fromMe: Determines whether the message was sent by the logged-in user. This is done by comparing the senderId of the message with authUser._id. If they match, fromMe is true.
// formattedTime: Formats the message's creation timestamp using the extractTime function.
// chatClassName: Dynamically determines the class name to align the message. If the message is from the logged-in user (fromMe), it uses chat-end (likely a CSS class for aligning the message to the right), otherwise, it uses chat-start (for the left side).
// profilePic: Determines which profile picture to use. If the message is from the logged-in user (fromMe), it uses authUser.profilePic; otherwise, it uses the profilePic from the selected conversation (the other participant).
// bubbleBgColor: If the message is from the logged-in user (fromMe), it adds a background color (bg-blue-500), which is likely a blue bubble for outgoing messages. Otherwise, no background color is applied.
// shakeClass: If message.shouldShake is true, it adds the class shake, which likely applies a shaking animation to the message bubble (useful for emphasizing certain messages).
// 4. Returning JSX
// javascript
// Copy code
// return (
//   <div className={`chat ${chatClassName}`}>
//     <div className='chat-image avatar'>
//       <div className='w-10 rounded-full'>
//         <img alt='Tailwind CSS chat bubble component' src={profilePic} />
//       </div>
//     </div>
//     <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
//     <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
//   </div>
// );
// <div className={chat ${chatClassName}}>: The outermost div for the message, where chatClassName ensures the correct alignment of the message based on whether it's from the logged-in user or not.
// Profile Picture:
// javascript
// Copy code
// <div className='chat-image avatar'>
//   <div className='w-10 rounded-full'>
//     <img alt='Tailwind CSS chat bubble component' src={profilePic} />
//   </div>
// </div>
// This section displays the sender's profile picture. It uses a circular shape (rounded-full) and a fixed width (w-10).
// Message Content:
// javascript
// Copy code
// <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
// This div displays the actual message. The classes text-white, bubbleBgColor, and shakeClass conditionally apply text color, background color, and the shaking animation, respectively. The message itself is accessed with message.message.
// Timestamp:
// javascript
// Copy code
// <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
// This section shows the formatted timestamp (formattedTime) in a smaller, faded text. It uses a flex container with some spacing between elements (gap-1) to align the content.
// Summary:
// The Message component:

// Displays a single chat message, with a profile picture, message text, and timestamp.
// Dynamically styles the message depending on whether it was sent by the logged-in user or another participant.
// Allows for special styling, such as background color for the message bubble, shaking animation, and timestamp formatting.