import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
		role: "",  // Added role state
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs((prev) => ({ ...prev, gender }));
	};

	const handleRoleChange = (e) => {
		const selectedRole = e.target.value;
		console.log("Selected role:", selectedRole); // Log the selected role
		setInputs((prev) => ({ ...prev, role: selectedRole }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitting signup with inputs:", inputs); 
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					{/* Full Name */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs((prev) => ({ ...prev, fullName: e.target.value }))}
						/>
					</div>

					{/* Username */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs((prev) => ({ ...prev, username: e.target.value }))}
						/>
					</div>

					{/* Password */}
					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
						/>
					</div>

					{/* Confirm Password */}
					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs((prev) => ({ ...prev, confirmPassword: e.target.value }))}
						/>
					</div>

					{/* Gender Checkbox */}
					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					{/* Role Selection */}
					<div className='mt-4'>
						<label className='label'>
							<span className='text-base label-text'>Select Role</span>
						</label>
						<select
							className='w-full select select-bordered'
							value={inputs.role}
							onChange={handleRoleChange}
						>
							<option value='' disabled>Select a role</option>
							<option value='donator'>Donator</option>
							<option value='recipient'>Recipient</option>
							<option value='crew_member'>Crew Member</option>
							<option value='admin'>Admin</option>
						</select>
					</div>

					{/* Link to Login */}
					<Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
						Already have an account?
					</Link>

					{/* Submit Button */}
					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;





// Here's an explanation of the code for the SignUp component:

// Imports:
// javascript
// Copy code
// import { Link } from "react-router-dom";
// import GenderCheckbox from "./GenderCheckbox";
// import { useState } from "react";
// import useSignup from "../../hooks/useSignup";
// Link: A component from react-router-dom used to create navigation links between pages.
// GenderCheckbox: A custom component (likely for selecting gender) imported to be used in the form.
// useState: A React hook used to manage the state within the component.
// useSignup: A custom hook (presumably used to handle the signup logic) imported from ../../hooks/useSignup.
// SignUp Component:
// javascript
// Copy code
// const SignUp = () => {
// Declares the SignUp functional component.
// useState Hook for form inputs:
// javascript
// Copy code
// const [inputs, setInputs] = useState({
// 	fullName: "",
// 	username: "",
// 	password: "",
// 	confirmPassword: "",
// 	gender: "",
// 	role: "",  // Added role state
// });
// Initializes state (inputs) to store form values for fullName, username, password, confirmPassword, gender, and role.
// setInputs: Function to update the state of inputs.
// Destructuring useSignup hook:
// javascript
// Copy code
// const { loading, signup } = useSignup();
// Extracts the loading and signup properties from the useSignup hook:
// loading: Used to track the signup process status (e.g., whether the signup request is being processed).
// signup: A function that is likely responsible for executing the signup logic (sending the signup request).
// Handling Gender Checkbox Change:
// javascript
// Copy code
// const handleCheckboxChange = (gender) => {
// 	setInputs((prev) => ({ ...prev, gender }));
// };
// A function to update the gender field in the state when a gender checkbox is selected.
// prev represents the previous state value, and ...prev spreads the current values into the new object while updating gender.
// Handling Role Change:
// javascript
// Copy code
// const handleRoleChange = (e) => {
// 	const selectedRole = e.target.value;
// 	console.log("Selected role:", selectedRole); // Log the selected role
// 	setInputs((prev) => ({ ...prev, role: selectedRole }));
// };
// This function handles when the user selects a role from the dropdown. It updates the role field in the inputs state with the selected value. It also logs the selected role to the console for debugging.
// Handle Form Submission:
// javascript
// Copy code
// const handleSubmit = async (e) => {
// 	e.preventDefault();
// 	console.log("Submitting signup with inputs:", inputs); 
// 	await signup(inputs);
// };
// This function prevents the default form submission behavior (e.preventDefault()).
// Logs the current form inputs to the console for debugging.
// Calls the signup function (from the useSignup hook) and passes the inputs object to it to perform the signup action asynchronously.
// JSX Return (Form Layout):
// javascript
// Copy code
// return (
// 	<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// Begins the JSX structure for the SignUp form. This div has flex styling to center its contents both horizontally and vertically.
// Form Container:
// javascript
// Copy code
// 	<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// A wrapper div for the form that includes padding (p-6), a rounded border (rounded-lg), a shadow (shadow-md), and background styling with blur effects for a modern UI look.
// Heading:
// javascript
// Copy code
// 	<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 		Sign Up <span className='text-blue-500'> ChatApp</span>
// 	</h1>
// Displays the title "Sign Up ChatApp" with different styling for the app's name, making it more visually distinct (blue color).
// Full Name Input:
// javascript
// Copy code
// 	<div>
// 		<label className='label p-2'>
// 			<span className='text-base label-text'>Full Name</span>
// 		</label>
// 		<input
// 			type='text'
// 			placeholder='John Doe'
// 			className='w-full input input-bordered h-10'
// 			value={inputs.fullName}
// 			onChange={(e) => setInputs((prev) => ({ ...prev, fullName: e.target.value }))}
// 		/>
// 	</div>
// A form field for entering the full name with a label and input box.
// The value of the input is controlled by the inputs.fullName state, and the onChange handler updates the state when the user types.
// Username Input:
// javascript
// Copy code
// 	<div>
// 		<label className='label p-2'>
// 			<span className='text-base label-text'>Username</span>
// 		</label>
// 		<input
// 			type='text'
// 			placeholder='johndoe'
// 			className='w-full input input-bordered h-10'
// 			value={inputs.username}
// 			onChange={(e) => setInputs((prev) => ({ ...prev, username: e.target.value }))}
// 		/>
// 	</div>
// Similar to the full name input, this is for entering a username. It also uses controlled input with inputs.username as the value and an onChange handler to update the state.
// Password Input:
// javascript
// Copy code
// 	<div>
// 		<label className='label'>
// 			<span className='text-base label-text'>Password</span>
// 		</label>
// 		<input
// 			type='password'
// 			placeholder='Enter Password'
// 			className='w-full input input-bordered h-10'
// 			value={inputs.password}
// 			onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
// 		/>
// 	</div>
// A password input field with similar behavior to the username and full name inputs, but for entering the password.
// Confirm Password Input:
// javascript
// Copy code
// 	<div>
// 		<label className='label'>
// 			<span className='text-base label-text'>Confirm Password</span>
// 		</label>
// 		<input
// 			type='password'
// 			placeholder='Confirm Password'
// 			className='w-full input input-bordered h-10'
// 			value={inputs.confirmPassword}
// 			onChange={(e) => setInputs((prev) => ({ ...prev, confirmPassword: e.target.value }))}
// 		/>
// 	</div>
// A field for confirming the password to ensure the user has entered the correct password.
// Gender Checkbox:
// javascript
// Copy code
// 	<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
// A custom GenderCheckbox component for selecting gender, passing the handleCheckboxChange function to update the gender in the state.
// Role Selection:
// javascript
// Copy code
// 	<div className='mt-4'>
// 		<label className='label'>
// 			<span className='text-base label-text'>Select Role</span>
// 		</label>
// 		<select
// 			className='w-full select select-bordered'
// 			value={inputs.role}
// 			onChange={handleRoleChange}
// 		>
// 			<option value='' disabled>Select a role</option>
// 			<option value='donator'>Donator</option>
// 			<option value='recipient'>Recipient</option>
// 			<option value='crew_member'>Crew Member</option>
// 			<option value='admin'>Admin</option>
// 		</select>
// 	</div>
// A dropdown select input for selecting a role, such as donator, recipient, crew_member, or admin.
// The value is controlled by the inputs.role state, and the onChange handler updates the selected role in the state.
// Login Link:
// javascript
// Copy code
// 	<Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
// 		Already have an account?
// 	</Link>
// A Link component from react-router-dom that navigates the user to the login page if they already have an account.
// Submit Button:
// javascript
// Copy code
// 	<div>
// 		<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
// 			{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
// 		</button>
// 	</div>
// A submit button for the form. It is disabled when loading is true, showing a loading spinner (<span className='loading loading-spinner'></span>) instead of the "Sign Up" text.
// Closing JSX and Component:
// javascript
// Copy code
// 		</form>
// 	</div>
// </div>
// );
// Closes the form and container div elements.
// The component ends here, and the JSX structure is complete.
// Final Export:
// javascript
// Copy code
// export default SignUp;
// Exports the SignUp component to be used in other parts of the application.












