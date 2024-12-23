import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { fetchAllUsers } from "../../api/userService"; // Ensure this imports your fetchAllUsers function
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const [users, setUsers] = useState([]); // State to store all users
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await fetchAllUsers(); // Fetch all users
        setUsers(allUsers); // Store all users in state
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = users.filter(user => 
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered); // Set filtered users based on search
    } else {
      setFilteredUsers([]); // Reset filtered users if search is empty
    }
  }, [search, users]);

  const handleUserClick = (user) => {
    const conversation = {
      _id: user._id,
      fullName: user.fullName,
      profilePic: user.profilePic,
    };
    setSelectedConversation(conversation); // Update selected conversation in Zustand
    setSearch(""); // Reset search input after selection
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Search…'
          className='input input-bordered rounded-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>
      
      {/* Display filtered user results */}
      {filteredUsers.length > 0 && (
        <ul className="mt-2">
          {filteredUsers.map(user => (
            <li
              key={user._id}
              className='py-2 px-3 hover:bg-gray-200 cursor-pointer'
              onClick={() => handleUserClick(user)} // Select user on click
            >
              {user.fullName} ({user.role}) {/* Display user role alongside name */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchInput;





// Explanation of the SearchInput Component:
// 1. Import Statements
// javascript
// Copy code
// import { useState, useEffect } from "react";
// import { IoSearchSharp } from "react-icons/io5";
// import { fetchAllUsers } from "../../api/userService";
// import useConversation from "../../zustand/useConversation";
// import toast from "react-hot-toast";
// useState and useEffect: React hooks for managing state and side effects, respectively.
// IoSearchSharp: A search icon from react-icons/io5.
// fetchAllUsers: A function to fetch all users from an API, used to populate the user list.
// useConversation: A Zustand store hook to manage conversations, including selecting a conversation.
// toast: A library for displaying notifications, used here to show error messages.
// 2. State Management
// javascript
// Copy code
// const [search, setSearch] = useState(""); 
// const { setSelectedConversation } = useConversation();
// const [users, setUsers] = useState([]); 
// const [filteredUsers, setFilteredUsers] = useState([]);
// search: The value of the search input.
// users: Stores the list of all fetched users.
// filteredUsers: Stores the list of users matching the search query.
// setSelectedConversation: Updates the selected conversation in the Zustand store.
// 3. Fetching All Users
// javascript
// Copy code
// useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const allUsers = await fetchAllUsers(); 
//       setUsers(allUsers); 
//     } catch (error) {
//       toast.error("Error fetching users");
//     }
//   };
//   fetchUsers();
// }, []);
// The fetchUsers function fetches the user list using fetchAllUsers.
// The list is stored in the users state. If there's an error, a toast notification is shown.
// 4. Filtering Users
// javascript
// Copy code
// useEffect(() => {
//   if (search) {
//     const filtered = users.filter(user => 
//       user.fullName.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredUsers(filtered); 
//   } else {
//     setFilteredUsers([]); 
//   }
// }, [search, users]);
// This useEffect runs whenever search or users changes:
// If the search input has text, it filters users to include those whose names match the query.
// If the input is empty, the filteredUsers list is cleared.
// 5. Selecting a User
// javascript
// Copy code
// const handleUserClick = (user) => {
//   const conversation = {
//     _id: user._id,
//     fullName: user.fullName,
//     profilePic: user.profilePic,
//   };
//   setSelectedConversation(conversation); 
//   setSearch(""); 
// };
// When a user from the filtered list is clicked:
// A new conversation object is created with the user's details.
// The conversation is selected in the Zustand store using setSelectedConversation.
// The search input is cleared.
// 6. Rendering the Input and Results
// javascript
// Copy code
// <form onSubmit={(e) => e.preventDefault()} className='flex items-center gap-2'>
//   <input
//     type='text'
//     placeholder='Search…'
//     className='input input-bordered rounded-full'
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//   />
//   <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//     <IoSearchSharp className='w-6 h-6 outline-none' />
//   </button>
// </form>
// The input field captures the search query, and its value is bound to the search state.
// A button with a search icon is included for styling purposes; it doesn't trigger additional functionality since the form prevents the default submit behavior.
// javascript
// Copy code
// {filteredUsers.length > 0 && (
//   <ul className="mt-2">
//     {filteredUsers.map(user => (
//       <li
//         key={user._id}
//         className='py-2 px-3 hover:bg-gray-200 cursor-pointer'
//         onClick={() => handleUserClick(user)} 
//       >
//         {user.fullName} ({user.role}) 
//       </li>
//     ))}
//   </ul>
// )}
// If filteredUsers has results:
// A list is rendered showing each user's name and role.
// Clicking a user triggers handleUserClick to select the conversation.
// Summary:
// The SearchInput component allows users to search through a list of fetched users in real time.
// It fetches all users once when the component mounts and stores them in state.
// As the user types, the input is filtered based on the fullName field.
// Clicking a filtered user selects them in the conversation context and clears the search input.
// Feedback is provided via toast notifications for errors, and the UI dynamically updates to show matching results.