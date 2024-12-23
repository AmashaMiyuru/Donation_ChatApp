import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;





// The useLogout hook you've shared is responsible for handling the logout functionality in your application. Let's break it down:

// Code Breakdown
// 1. Imports
// javascript
// Copy code
// import { useState } from "react";
// import { useAuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";
// useState: React hook used to manage the loading state that tracks whether the logout request is in progress.
// useAuthContext: A custom hook used to access the AuthContext which provides the functionality to set or remove the authenticated user.
// toast: An external library used to display error notifications if any issue occurs during the logout process.
// 2. useLogout Hook
// javascript
// Copy code
// const useLogout = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { setAuthUser } = useAuthContext();
// loading: A state that tracks whether the logout request is being processed. Initially set to false.
// setAuthUser: A function from AuthContext that updates the user context. In this case, it's used to remove the authenticated user from the context during logout.
// 3. logout Function
// javascript
// Copy code
// const logout = async () => {
// 	setLoading(true);
// 	try {
// 		const res = await fetch("/api/auth/logout", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 		});
// 		const data = await res.json();
// 		if (data.error) {
// 			throw new Error(data.error);
// 		}

// 		localStorage.removeItem("chat-user");
// 		setAuthUser(null);
// 	} catch (error) {
// 		toast.error(error.message);
// 	} finally {
// 		setLoading(false);
// 	}
// };
// logout: This function is triggered when the user logs out. It performs the following:
// setLoading(true): Indicates that the logout request is in progress.
// fetch("/api/auth/logout", {...}): Makes a POST request to the server to log out the user. The request sends no body but requires a Content-Type header of application/json.
// await res.json(): Waits for the server's response, which is expected to be a JSON object.
// if (data.error): If the server returns an error, the function throws an error with the message.
// localStorage.removeItem("chat-user"): Removes the user data stored in localStorage under the key chat-user to clear the persisted user information.
// setAuthUser(null): Removes the authenticated user from the AuthContext, effectively logging the user out across the application.
// toast.error(error.message): If an error occurs (either from the server or during the process), an error message is displayed using the toast notification system.
// finally { setLoading(false) }: Regardless of the success or failure of the request, this ensures that the loading state is reset to false.
// 4. Return Values
// javascript
// Copy code
// return { loading, logout };
// loading: This state can be used in the component to show a loading spinner or disable the logout button while the logout request is in progress.
// logout: The function that will be called when the user attempts to log out.
// Usage Example
// This hook can be used in a component as follows:

// javascript
// Copy code
// import React from "react";
// import useLogout from "../hooks/useLogout";

// const LogoutButton = () => {
// 	const { logout, loading } = useLogout();

// 	const handleLogout = () => {
// 		logout();
// 	};

// 	return (
// 		<button onClick={handleLogout} disabled={loading}>
// 			{loading ? "Logging out..." : "Logout"}
// 		</button>
// 	);
// };

// export default LogoutButton;
// Key Points
// Error Handling: If the API response contains an error, it's thrown as an exception and shown as a toast notification.
// State Management: The loading state is used to indicate that the logout process is in progress. The button or UI element calling the logout function can use this state to show a loading spinner or disable the button.
// Local Storage Removal: The user's authentication data is removed from localStorage to ensure the user is logged out even after a page reload.
// Context Update: The setAuthUser(null) clears the user data from the AuthContext, which makes sure that the application is updated to reflect that the user is logged out.
// This hook is a simple and effective way to manage user logout functionality in your application, ensuring that both the local state and local storage are properly updated.