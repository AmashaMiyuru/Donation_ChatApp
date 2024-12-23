import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}





// The useLogin hook you've provided is responsible for handling user login functionality. Let's go through each part of the code to understand its workings.

// Code Breakdown
// 1. Imports
// javascript
// Copy code
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
// useState: React hook used to manage the loading state that indicates whether the login request is in progress.
// toast: An external library used to display notifications, here it shows error messages when there is an issue with login or input validation.
// useAuthContext: A custom hook that provides access to the AuthContext, which manages authentication-related data and actions like setting the authenticated user.
// 2. useLogin Hook
// javascript
// Copy code
// const useLogin = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { setAuthUser } = useAuthContext();
// loading: The state that tracks whether the login request is in progress. Initially set to false.
// setAuthUser: A function from the AuthContext that updates the authenticated user's data. This will be called once the login is successful to store the user in the context.
// 3. login Function
// javascript
// Copy code
// const login = async (username, password) => {
// 	const success = handleInputErrors(username, password);
// 	if (!success) return;
// 	setLoading(true);
// login: The function that is called to handle the login process. It takes username and password as arguments.
// handleInputErrors: This helper function is called to validate the inputs (username and password). If there is an error (e.g., empty fields), it will display an error message and stop the login process by returning false.
// setLoading(true): Sets the loading state to true, indicating that the login request is being processed.
// 4. Making the API Request
// javascript
// Copy code
// try {
// 	const res = await fetch("/api/auth/login", {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ username, password }),
// 	});

// 	const data = await res.json();
// 	if (data.error) {
// 		throw new Error(data.error);
// 	}

// 	localStorage.setItem("chat-user", JSON.stringify(data));
// 	setAuthUser(data);
// } catch (error) {
// 	toast.error(error.message);
// } finally {
// 	setLoading(false);
// }
// fetch("/api/auth/login", {...}): Makes a POST request to the server with the username and password. The request body is serialized as JSON.
// await res.json(): Parses the response from the server as JSON.
// if (data.error): If the server response contains an error, an error is thrown with the message.
// localStorage.setItem("chat-user", JSON.stringify(data)): If the login is successful, the user data is stored in localStorage under the key chat-user.
// setAuthUser(data): Updates the AuthContext with the logged-in user's data to reflect the change in the application.
// Error Handling: If there is an error during the API request, the error message is displayed via the toast.error function.
// finally { setLoading(false) }: Regardless of success or failure, the loading state is set back to false when the request is completed.
// 5. Return Values
// javascript
// Copy code
// return { loading, login };
// The hook returns an object containing the loading state and the login function.
// loading: This can be used in the component to show a loading spinner or disable buttons while the login process is ongoing.
// login: The function that will be called to attempt logging in with the provided username and password.
// 6. handleInputErrors Function
// javascript
// Copy code
// function handleInputErrors(username, password) {
// 	if (!username || !password) {
// 		toast.error("Please fill in all fields");
// 		return false;
// 	}
// 	return true;
// }
// handleInputErrors: A helper function that checks if the username or password is missing. If either is missing, it shows a toast error message and returns false to prevent the login process from continuing.
// return true: If both fields are filled, it returns true, allowing the login request to proceed.
// Usage Example
// This custom hook could be used in a login component like this:

// javascript
// Copy code
// import React, { useState } from "react";
// import useLogin from "../hooks/useLogin";

// const LoginComponent = () => {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const { login, loading } = useLogin();

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		login(username, password);
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<input
// 				type="text"
// 				placeholder="Username"
// 				value={username}
// 				onChange={(e) => setUsername(e.target.value)}
// 			/>
// 			<input
// 				type="password"
// 				placeholder="Password"
// 				value={password}
// 				onChange={(e) => setPassword(e.target.value)}
// 			/>
// 			<button type="submit" disabled={loading}>
// 				{loading ? "Logging in..." : "Login"}
// 			</button>
// 		</form>
// 	);
// };

// export default LoginComponent;
// Key Points
// Error Handling: The handleInputErrors function ensures that both username and password are provided before submitting the login request.
// Async Request: The login function is asynchronous, handling the HTTP request and response.
// Loading State: The loading state is used to disable the login button or show a loading indicator while the login request is in progress.
// LocalStorage: The logged-in user's data is stored in localStorage for persistence across page reloads, and it's also set in the context to make it available globally across components.
// Toast Notifications: Errors from the server or missing input are shown using react-hot-toast to provide immediate feedback to the user.