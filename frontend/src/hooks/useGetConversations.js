import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;





// The provided code defines a custom hook useGetConversations that fetches conversation data from an API endpoint (/api/users). Here's a breakdown of the functionality:

// Code Breakdown
// 1. Imports
// javascript
// Copy code
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// useEffect: React hook used to perform side effects in function components. In this case, it will be used to fetch data when the component mounts.
// useState: React hook used to manage local state within a component.
// toast: A library used for showing notifications. react-hot-toast is used here to display error messages if the data fetch fails.
// 2. State Initialization
// javascript
// Copy code
// const [loading, setLoading] = useState(false);
// const [conversations, setConversations] = useState([]);
// loading: A state to track if the data is still being fetched. It starts as false, indicating the data is not loading initially.
// conversations: A state that holds the list of fetched conversations. It starts as an empty array.
// 3. Fetching Conversations
// javascript
// Copy code
// useEffect(() => {
//   const getConversations = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/users");
//       const data = await res.json();
//       if (data.error) {
//         throw new Error(data.error);
//       }
//       setConversations(data);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   getConversations();
// }, []);
// useEffect:
// This runs the getConversations function when the component mounts (because the dependency array [] is empty, meaning it will only run once).
// getConversations:
// setLoading(true): Sets loading to true to indicate that the fetch request is in progress.
// fetch("/api/users"): Makes a request to the API to fetch data from the endpoint /api/users.
// res.json(): Parses the response to JSON format.
// Error handling:
// If the response contains an error (data.error), it throws an error and shows an error toast using toast.error.
// If an error occurs in fetching or parsing, the error is caught in the catch block, and a message is shown using toast.error.
// finally: Whether the request is successful or fails, setLoading(false) is called to indicate that the loading is complete.
// 4. Return Values
// javascript
// Copy code
// return { loading, conversations };
// The hook returns an object containing:
// loading: Whether the data is still being fetched.
// conversations: The data fetched from the API.
// Usage Example
// If you want to use this custom hook in a component:

// javascript
// Copy code
// import useGetConversations from "../hooks/useGetConversations";

// const ConversationsList = () => {
//   const { loading, conversations } = useGetConversations();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ul>
//       {conversations.map((conversation) => (
//         <li key={conversation.id}>{conversation.name}</li>
//       ))}
//     </ul>
//   );
// };

// export default ConversationsList;
// In this example:
// The useGetConversations hook is used to fetch conversations.
// If loading is true, it displays a "Loading..." message.
// Once the conversations are loaded, it renders them in a list.
// Summary of the Workflow
// The useGetConversations hook starts by setting loading to true and attempts to fetch data from /api/users.
// If the data fetch is successful, the state conversations is updated with the fetched data.
// If there’s an error, an error message is shown via toast.error.
// Once the fetch is complete (successful or failed), loading is set to false.
// This hook centralizes the logic for data fetching, state management, and error handling, making it reusable and easy to use in any component that requires the list of conversations.







