import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;





// The Login component you've provided is designed to handle user authentication in a React application. Below is a breakdown of its key features and how the code works:

// Code Breakdown
// 1. State Management
// javascript
// Copy code
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// username and password: These are two state variables used to track the input values for the username and password fields in the login form. The values are updated using their respective setUsername and setPassword functions.
// 2. useLogin Hook
// javascript
// Copy code
// const { loading, login } = useLogin();
// loading: A state indicating whether the login request is in progress. It helps in disabling the login button and displaying a loading spinner.
// login: The function that handles the login logic, imported from a custom useLogin hook. This hook likely contains the logic for making a request to the backend to authenticate the user.
// 3. Form Submission
// javascript
// Copy code
// const handleSubmit = async (e) => {
// 	e.preventDefault();
// 	await login(username, password);
// };
// handleSubmit: This function is called when the form is submitted. It prevents the default form submission and calls the login function, passing the username and password as parameters. The await ensures the login process is completed before taking any further actions.
// 4. Rendering the UI
// javascript
// Copy code
// return (
// 	<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 		<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 			<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 				Login
// 				<span className='text-blue-500'> ChatApp</span>
// 			</h1>

// 			<form onSubmit={handleSubmit}>
// 				{/* Username Field */}
// 				<div>
// 					<label className='label p-2'>
// 						<span className='text-base label-text'>Username</span>
// 					</label>
// 					<input
// 						type='text'
// 						placeholder='Enter username'
// 						className='w-full input input-bordered h-10'
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 					/>
// 				</div>

// 				{/* Password Field */}
// 				<div>
// 					<label className='label'>
// 						<span className='text-base label-text'>Password</span>
// 					</label>
// 					<input
// 						type='password'
// 						placeholder='Enter Password'
// 						className='w-full input input-bordered h-10'
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 					/>
// 				</div>

// 				{/* Link to Signup Page */}
// 				<Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
// 					{"Don't"} have an account?
// 				</Link>

// 				{/* Submit Button */}
// 				<div>
// 					<button className='btn btn-block btn-sm mt-2' disabled={loading}>
// 						{loading ? <span className='loading loading-spinner'></span> : "Login"}
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	</div>
// );
// Main Container: The div with classes like flex, items-center, and justify-center ensures that the login form is centered on the screen. The p-6 class adds padding to the form container.
// Form Fields:
// Username and Password: These input fields are controlled components. The value prop is set to the respective state variables (username and password), and the onChange handler updates the state when the user types.
// Signup Link: The Link component is used to navigate the user to the signup page. It is styled as a small text link that changes color when hovered over.
// Submit Button: The button triggers the form submission. It is disabled while the login request is in progress (loading is true). If the login is in progress, a loading spinner is displayed inside the button.
// Error Handling
// The login function is called within handleSubmit, and if there are errors in the process (e.g., invalid credentials), those errors should be handled within the useLogin hook. It’s likely that useLogin uses toast (from react-hot-toast) or similar for error notifications, though this is not explicitly shown in this component.
// Possible Enhancements
// Form Validation:

// Currently, there’s no validation for the inputs (username, password). It would be a good idea to add checks like ensuring both fields are non-empty before submitting the form.
// Error Handling UI:

// You may want to display a message or UI component indicating why the login failed (e.g., incorrect credentials). You can extend the useLogin hook to store error messages and show them in the component.
// Redirect After Successful Login:

// After a successful login, you might want to redirect the user to another page, like the home or dashboard page. This can be done using useNavigate from react-router-dom inside useLogin.
// Security Considerations:

// Make sure to implement proper security measures, such as encrypting the password before sending it to the server (e.g., using HTTPS) and handling authentication tokens securely.
// Example useLogin Hook
// Here is an example of what the useLogin hook might look like:

// javascript
// Copy code
// import { useState } from "react";
// import toast from "react-hot-toast";

// const useLogin = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	const login = async (username, password) => {
// 		setLoading(true);
// 		try {
// 			const res = await fetch("/api/auth/login", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ username, password }),
// 			});
// 			const data = await res.json();
// 			if (data.error) {
// 				setError(data.error);
// 				toast.error(data.error);
// 				return;
// 			}
// 			// Handle successful login (store user data, redirect, etc.)
// 		} catch (err) {
// 			setError("An error occurred. Please try again.");
// 			toast.error("An error occurred. Please try again.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return { loading, login, error };
// };
// export default useLogin;
// This useLogin hook provides the necessary logic for performing a login, including error handling and loading state management.

// Conclusion
// The Login component is well-structured and easy to follow. You’re using useState for managing form input, useLogin for handling login logic, and react-router-dom for navigation. Adding input validation and error handling would improve the user experience and make the application more robust.











