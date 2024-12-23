import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;





// Explanation of the Conversations Component:
// 1. Import Statements
// javascript
// Copy code
// import useGetConversations from "../../hooks/useGetConversations";
// import { getRandomEmoji } from "../../utils/emojis";
// import Conversation from "./Conversation";
// useGetConversations: This is a custom hook that likely handles fetching conversations from an API or state management system. It returns the current loading state and the list of conversations.
// getRandomEmoji: This is a utility function that generates a random emoji (possibly for each conversation to be displayed).
// Conversation: This imports the Conversation component, which is used to render each individual conversation.
// 2. Component Definition
// javascript
// Copy code
// const Conversations = () => {
// Conversations is a functional component that represents a list of conversations.
// 3. Fetching Conversations and Handling State
// javascript
// Copy code
// const { loading, conversations } = useGetConversations();
// The useGetConversations hook is invoked, and its return values are destructured:
// loading: A boolean that indicates whether the conversations are still being fetched.
// conversations: An array of conversation objects that will be rendered in the component.
// 4. Rendering Conversations
// javascript
// Copy code
// return (
//   <div className='py-2 flex flex-col overflow-auto'>
//     {conversations.map((conversation, idx) => (
//       <Conversation
//         key={conversation._id}
//         conversation={conversation}
//         emoji={getRandomEmoji()}
//         lastIdx={idx === conversations.length - 1}
//       />
//     ))}
// The div container holds the list of conversations and uses some utility classes:
// py-2 flex flex-col overflow-auto: Adds vertical padding (py-2), arranges the conversations vertically (flex flex-col), and allows the list to scroll (overflow-auto).
// Rendering Conversations with map():
// The conversations.map() method loops through the array of conversations and renders a Conversation component for each one.
// key={conversation._id}: Uses the conversation's unique _id as the key to help React optimize re-rendering.
// conversation={conversation}: Passes the entire conversation object to the Conversation component.
// emoji={getRandomEmoji()}: Generates a random emoji for each conversation by calling the getRandomEmoji function and passes it to the Conversation component.
// lastIdx={idx === conversations.length - 1}: Determines if the current conversation is the last one in the list, which may be used to control the display of a divider in the Conversation component (as in the first code snippet you provided).
// 5. Loading State
// javascript
// Copy code
// {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
// If loading is true, a spinner is displayed in the center of the container (mx-auto ensures it's centered horizontally). This indicates that the data is being loaded. Once loading is finished, the spinner is removed, and the conversations will be displayed.
// 6. Export
// javascript
// Copy code
// export default Conversations;
// The Conversations component is exported for use in other parts of the application.
