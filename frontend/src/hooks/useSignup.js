import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender, role }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;
	
		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender, role }), // Include role here
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
	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}




// The useSignup hook you've provided handles user registration (signup) by sending a request to the server with the provided user details. Here's a breakdown of the functionality:

// Code Breakdown
// 1. Imports
// javascript
// Copy code
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
// useState: React hook to manage the loading state, indicating whether the signup process is in progress.
// toast: Utility for showing toast notifications, used here to display errors.
// useAuthContext: Custom hook to access the authentication context and set the authenticated user once the signup is successful.
// 2. useSignup Hook
// javascript
// Copy code
// const useSignup = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { setAuthUser } = useAuthContext();
// loading: Tracks whether the signup request is in progress.
// setAuthUser: Function from the AuthContext to update the authenticated user's details after a successful signup.
// 3. signup Function
// javascript
// Copy code
// const signup = async ({ fullName, username, password, confirmPassword, gender, role }) => {
// 	const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
// 	if (!success) return;
	
// 	setLoading(true);
// 	try {
// 		const res = await fetch("/api/auth/signup", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ fullName, username, password, confirmPassword, gender, role }),
// 		});
	
// 		const data = await res.json();
// 		if (data.error) {
// 			throw new Error(data.error);
// 		}
// 		localStorage.setItem("chat-user", JSON.stringify(data));
// 		setAuthUser(data);
// 	} catch (error) {
// 		toast.error(error.message);
// 	} finally {
// 		setLoading(false);
// 	}
// };
// handleInputErrors: A function that checks if all required fields are filled, validates the password, and checks for matching passwords.
// setLoading(true): Sets the loading state to true, indicating that the signup request is in progress.
// fetch("/api/auth/signup", {...}): Sends a POST request to the server with the signup data.
// The request contains the fullName, username, password, confirmPassword, gender, and role.
// role: This is added to the payload to allow the user to choose a role during signup.
// await res.json(): Waits for the response and parses it as JSON.
// Error Handling: If the response contains an error, it throws an exception.
// localStorage.setItem("chat-user", JSON.stringify(data)): Stores the signed-up user's data in localStorage.
// setAuthUser(data): Updates the authentication context with the new user details.
// toast.error(error.message): Shows a toast notification if an error occurs.
// finally { setLoading(false) }: Resets the loading state to false, regardless of whether the signup was successful or not.
// 4. Return Values
// javascript
// Copy code
// return { loading, signup };
// loading: A state variable indicating if the signup request is in progress.
// signup: The function that will be invoked to handle the signup process.
// handleInputErrors Function
// javascript
// Copy code
// function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
// 	if (!fullName || !username || !password || !confirmPassword || !gender) {
// 		toast.error("Please fill in all fields");
// 		return false;
// 	}

// 	if (password !== confirmPassword) {
// 		toast.error("Passwords do not match");
// 		return false;
// 	}

// 	if (password.length < 6) {
// 		toast.error("Password must be at least 6 characters");
// 		return false;
// 	}

// 	return true;
// }
// This helper function checks the following conditions:
// If any of the required fields (fullName, username, password, confirmPassword, gender) are empty, it displays an error message and returns false.
// If the password and confirmPassword do not match, it shows an error and returns false.
// If the password length is less than 6 characters, it shows an error and returns false.
// If all checks pass, it returns true.
// Usage Example
// Here's how you could use this useSignup hook in a signup form component:

// javascript
// Copy code
// import React, { useState } from "react";
// import useSignup from "../hooks/useSignup";

// const SignupForm = () => {
// 	const [fullName, setFullName] = useState("");
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");
// 	const [gender, setGender] = useState("");
// 	const [role, setRole] = useState(""); // For example: "user", "admin"
// 	const { signup, loading } = useSignup();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const userData = { fullName, username, password, confirmPassword, gender, role };
// 		await signup(userData);
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<input
// 				type="text"
// 				placeholder="Full Name"
// 				value={fullName}
// 				onChange={(e) => setFullName(e.target.value)}
// 			/>
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
// 			<input
// 				type="password"
// 				placeholder="Confirm Password"
// 				value={confirmPassword}
// 				onChange={(e) => setConfirmPassword(e.target.value)}
// 			/>
// 			<select value={gender} onChange={(e) => setGender(e.target.value)}>
// 				<option value="">Select Gender</option>
// 				<option value="male">Male</option>
// 				<option value="female">Female</option>
// 			</select>
// 			<select value={role} onChange={(e) => setRole(e.target.value)}>
// 				<option value="">Select Role</option>
// 				<option value="user">User</option>
// 				<option value="admin">Admin</option>
// 			</select>
// 			<button type="submit" disabled={loading}>
// 				{loading ? "Signing Up..." : "Sign Up"}
// 			</button>
// 		</form>
// 	);
// };

// export default SignupForm;
// Key Points
// Signup Function: Handles the entire signup process, including validation and sending the data to the server.
// Input Validation: Ensures that the user inputs valid data, including matching passwords and non-empty fields.
// Error Handling: If the signup fails (e.g., due to invalid input or server issues), the user is notified via a toast.
// Loading State: The button is disabled and shows a loading message when the signup is in progress.
// This approach ensures that your signup process is robust, with proper validation and error handling.











