import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;





// Import Statements
// javascript
// Copy code
// import { useSocketContext } from "../../context/SocketContext";
// import useConversation from "../../zustand/useConversation";
// useSocketContext: This imports a custom hook from a context file (SocketContext). This hook is likely used to provide socket-related data, such as the list of online users (onlineUsers).
// useConversation: This imports a custom hook from the Zustand state management store. It is used to manage conversation data, such as selecting a conversation (selectedConversation), and updating the selected conversation (setSelectedConversation).
// 2. Component Definition
// javascript
// Copy code
// const Conversation = ({ conversation, lastIdx, emoji }) => {
// Conversation is a functional component that receives three props:
// conversation: An object that contains the details of the conversation (e.g., user profile, full name, etc.).
// lastIdx: Likely used to determine if the conversation is the last one in a list (it’s not utilized in the main code but is used to control UI rendering, specifically for the divider).
// emoji: It looks like it would be used to render an emoji, but it’s not used in the current code.
// 3. State and Context Usage
// javascript
// Copy code
// const { selectedConversation, setSelectedConversation } = useConversation();
// This line uses the useConversation hook to extract:
// selectedConversation: The currently selected conversation (used for highlighting the conversation that is selected).
// setSelectedConversation: A function to update the selected conversation state.
// javascript
// Copy code
// const { onlineUsers } = useSocketContext();
// This line uses the useSocketContext hook to access:
// onlineUsers: A list of users who are currently online, which will be used to indicate if a conversation is online.
// 4. Conditionals for UI
// javascript
// Copy code
// const isSelected = selectedConversation?._id === conversation._id;
// This checks if the current conversation is selected by comparing its _id with the _id of the selectedConversation. This determines whether the conversation will have a highlighted background (bg-sky-500).
// javascript
// Copy code
// const isOnline = onlineUsers.includes(conversation._id);
// This checks if the conversation._id exists in the onlineUsers list. If true, it indicates that the conversation's user is online and applies an "online" class to the avatar.
// 5. JSX Rendering
// javascript
// Copy code
// return (
//   <>
//     <div
//       className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
//         ${isSelected ? "bg-sky-500" : ""}
//       `}
//       onClick={() => setSelectedConversation(conversation)}
//     >
// This creates a div for each conversation in the sidebar.
// flex gap-2 items-center: Aligns the avatar and name in a horizontal layout with spacing.
// hover:bg-sky-500: Changes the background color when the user hovers over the conversation.
// rounded p-2 py-1: Adds padding and rounded corners.
// cursor-pointer: Changes the cursor to a pointer when hovered, indicating it's clickable.
// ${isSelected ? "bg-sky-500" : ""}: Conditionally applies a background color if the conversation is selected.
// javascript
// Copy code
// <div className={`avatar ${isOnline ? "online" : ""}`}>
//   <div className='w-12 rounded-full'>
//     <img src={conversation.profilePic} alt='user avatar' />
//   </div>
// </div>
// avatar: A div used to display the user’s avatar.
// ${isOnline ? "online" : ""}: Adds the online class if the user is online.
// w-12 rounded-full: Sets the size and rounded appearance for the avatar.
// img src={conversation.profilePic}: Displays the profile picture for the conversation.
// javascript
// Copy code
// <div className='flex flex-col flex-1'>
//   <div className='flex gap-3 justify-between'>
//     <p className='font-bold text-gray-200'>{conversation.fullName}</p>
//   </div>
// </div>
// This section displays the user's full name.
// flex flex-col flex-1: Uses Flexbox to arrange the name and potentially other elements in a column layout.
// font-bold text-gray-200: Adds bold text and a gray color to the name.
// gap-3 justify-between: Creates space between items (name and potentially other elements in the future).
// javascript
// Copy code
// </div>
// {!lastIdx && <div className='divider my-0 py-0 h-1' />}
// {!lastIdx && <div className='divider my-0 py-0 h-1' />}: This is a conditional check. If lastIdx is not truthy (i.e., not the last conversation in the list), a divider (<div className='divider' />) will be rendered to separate the conversation items.
// 6. Export
// javascript
// Copy code
// export default Conversation;
// This exports the Conversation component to be used in other parts of the application.
