import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { fetchUsersByRole, fetchLoggedInUserRole } from "../../api/userService.js";
import useConversation from "../../zustand/useConversation";

const Sidebar = () => {
  const { setSelectedConversation } = useConversation();
  const [selectedRole, setSelectedRole] = useState("Select User");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await fetchLoggedInUserRole();
        setLoggedInUserRole(role);
      } catch (error) {
        console.error("Error fetching logged-in user role:", error);
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    if (loggedInUserRole) {
      fetchUsers(); // Fetch users based on the logged-in user role
    }
  }, [loggedInUserRole]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let allowedRoles = [];

      // Determine allowed roles based on logged-in user's role
      if (loggedInUserRole === "donator") {
        allowedRoles = ['recipient', 'crew_member'];
      } else if (loggedInUserRole === "recipient") {
        allowedRoles = ['donator', 'crew_member'];
      } else if (loggedInUserRole === "crew_member" || loggedInUserRole === "admin") {
        allowedRoles = ['recipient', 'donator', 'crew_member', 'admin'];
      }

      // Fetch users for all allowed roles at once
      const usersData = await Promise.all(
        allowedRoles.map(role => fetchUsersByRole(role))
      );

      const allUsers = usersData.flat(); // Flatten the array of users
      setUsers(allUsers); // Update the state with the combined users

      // Set the selected role to the first allowed role if it's not already set
      if (!selectedRole) {
        setSelectedRole(allowedRoles[0]);
      }
    } catch (error) {
      setError("Error fetching users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleClick = async (role) => {
    setSelectedRole(role);
    // Fetch users based on the selected role only
    try {
      const usersByRole = await fetchUsersByRole(role);
      setUsers(usersByRole); // Update the users state with the selected role users
    } catch (error) {
      setError("Error fetching users. Please try again.");
      console.error("Error fetching users:", error);
    }
  };

  const handleUserClick = (user) => {
    const conversation = {
      _id: user._id,
      fullName: user.fullName,
      profilePic: user.profilePic,
    };
    setSelectedConversation(conversation);
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput onSearch={setUsers} />
      <div className='divider px-3'></div>

      {/* Role Buttons */}
      <div className='flex justify-around mb-4'>
        {['recipient', 'donator', 'crew_member', 'admin'].map((role) => (
          <button
            key={role}
            className={`btn ${selectedRole === role ? 'btn-active' : ''}`}
            onClick={() => handleRoleClick(role)}
            disabled={
              (loggedInUserRole === "recipient" && (role === "admin" || role === "recipient")) ||
              (loggedInUserRole === "donator" && (role === "admin" || role === "donator")) ||
              (loggedInUserRole === "crew_member" && role === "admin")
            } // Disable buttons based on the logged-in user role
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}s
          </button>
        ))}
      </div>

      {/* Loading and Error Handling */}
      {loading && <p className='text-center'>Loading users...</p>}
      {error && <p className='text-center text-red-500'>{error}</p>}

      {/* User List */}
      <div>
        <h3 className='text-center font-semibold text-lg'>
          {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}s
        </h3>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className='py-2 px-3 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleUserClick(user)}
              >
                {user.fullName}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-500'>No users found.</p>
        )}
      </div>

      <div className='mt-auto'>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;




// Observations and Suggestions:
// Dynamic Button Disabling:

// The logic for disabling buttons based on roles works but can be further modularized for readability. You can extract the button disabling logic into a helper function:

// javascript
// Copy code
// const isRoleDisabled = (role) => {
//   if (loggedInUserRole === "recipient") {
//     return role === "admin" || role === "recipient";
//   }
//   if (loggedInUserRole === "donator") {
//     return role === "admin" || role === "donator";
//   }
//   if (loggedInUserRole === "crew_member") {
//     return role === "admin";
//   }
//   return false;
// };
// Use it in the button rendering:

// javascript
// Copy code
// disabled={isRoleDisabled(role)}
// Role Buttons UI:

// The role buttons can benefit from dynamic styling to make the active button stand out more. Use a className with conditionally applied styles for the active role:
// javascript
// Copy code
// className={`btn ${selectedRole === role ? 'btn-active btn-primary' : 'btn-outline'}`}
// Error and Loading States:

// Currently, the error and loading messages are separate from the user list. To improve user experience:
// Show loading and error states inline with the user list.
// Consider disabling role buttons during the loading state to avoid unnecessary requests.
// Default Role Selection:

// The selectedRole state defaults to "Select User", which might not align with the roles fetched. Consider dynamically setting it to the first allowed role after roles are fetched.
// Reusability of Fetch Logic:

// The fetchUsers and handleRoleClick functions share similar logic. You can combine these to a single function that accepts an optional role and fetches users accordingly.
// Fallback UI for Empty Roles:

// While No users found is shown when there are no users, you might want to add a more detailed or contextual fallback message, such as No recipients available for messaging.
// Code Optimization Example:
// Here’s an optimized version of some sections for better clarity and performance:

// javascript
// Copy code
// const fetchUsers = async (role = null) => {
//   setLoading(true);
//   setError(null);
//   try {
//     const rolesToFetch = role ? [role] : getAllowedRoles(loggedInUserRole);
//     const usersData = await Promise.all(rolesToFetch.map(fetchUsersByRole));
//     setUsers(usersData.flat());
//     setSelectedRole(role || rolesToFetch[0]);
//   } catch (error) {
//     setError("Error fetching users. Please try again.");
//     console.error("Error fetching users:", error);
//   } finally {
//     setLoading(false);
//   }
// };

// const getAllowedRoles = (role) => {
//   switch (role) {
//     case "donator":
//       return ["recipient", "crew_member"];
//     case "recipient":
//       return ["donator", "crew_member"];
//     case "crew_member":
//     case "admin":
//       return ["recipient", "donator", "crew_member", "admin"];
//     default:
//       return [];
//   }
// };
// User Experience Enhancements:
// Search Integration: Your SearchInput allows searching across all users. Consider integrating it with role-based filtering so that search respects the selected role.
// Button Loading Indicator: Add a small loading spinner to role buttons while the corresponding users are being fetched.
// Final Thoughts:
// Your Sidebar implementation handles the complexities of role-based user filtering well. By modularizing logic and improving state management, you can make the component more maintainable and user-friendly. Let me know if you'd like help implementing any of these suggestions!