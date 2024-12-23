import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender, role } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const profilePic = gender === "male" 
			? `https://avatar.iran.liara.run/public/boy?username=${username}` 
			: `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic,
			role,
		});

		await newUser.save();
		generateTokenAndSetCookie(newUser._id, res);

		res.status(201).json({
			_id: newUser._id,
			fullName: newUser.fullName,
			username: newUser.username,
			profilePic: newUser.profilePic,
		});
	} catch (error) {
		console.error("Error in signup controller", error.stack);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.error("Error in login controller", error.stack);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Error in logout controller", error.stack);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const getLoggedInUserRole = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user data on req.user
        const user = await User.findById(userId).select('role'); // Select only the role field

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ role: user.role });
    } catch (error) {
        console.error("Error fetching logged-in user role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// This code implements a set of controllers for user authentication and role management in a Node.js application, likely using Express.js as the backend framework. Here’s a detailed explanation of each controller:

// 1. Signup
// Function: Handles new user registration.

// Flow:

// Extracts data (fullName, username, password, confirmPassword, gender, role) from the request body.
// Checks if password and confirmPassword match. If not, it returns a 400 Bad Request error.
// Checks if the username is already taken by querying the database. If it exists, returns a 400 error.
// Hashes the password using bcrypt with a salt of 10 rounds.
// Sets a profilePic URL based on the user's gender. This URL uses a service that generates avatars dynamically.
// Creates a new user document in the database with the hashed password and other user details.
// Saves the user to the database.
// Calls generateTokenAndSetCookie to create a JWT for the user and sets it as a cookie in the response.
// Returns a response with the user’s details (excluding the password) and a status of 201 Created.
// Key Points:

// Password hashing ensures sensitive data is not stored in plain text.
// Avatar URLs depend on the user’s gender.
// 2. Login
// Function: Authenticates an existing user.

// Flow:

// Extracts username and password from the request body.
// Finds the user by username in the database.
// If the user doesn’t exist, returns a 400 error.
// Compares the provided password with the hashed password in the database using bcrypt.compare.
// If passwords don’t match, returns a 400 error.
// If authentication is successful, calls generateTokenAndSetCookie to generate a JWT and sets it in a cookie.
// Returns a response with user details (excluding the password) and a status of 200 OK.
// Key Points:

// Protects against unauthorized access by verifying both username and password.
// Relies on bcrypt.compare to securely check passwords.
// 3. Logout
// Function: Logs the user out by clearing the JWT cookie.

// Flow:

// Clears the jwt cookie by setting its value to an empty string and maxAge to 0.
// Returns a success message with a status of 200 OK.
// Key Points:

// Ensures the user is logged out by invalidating the cookie.
// 4. getLoggedInUserRole
// Function: Retrieves the role of the currently logged-in user.

// Flow:

// Assumes req.user contains the authenticated user's data (typically populated by middleware).
// Extracts the userId from req.user._id.
// Queries the database for the user's role field using findById and the select method to retrieve only the role.
// If the user is not found, returns a 404 Not Found error.
// If successful, returns the user's role with a status of 200 OK.
// Key Points:

// Uses req.user for authentication context, which likely relies on middleware that decodes the JWT.
// Minimizes database query payload by selecting only the role field.
// General Features of the Code
// Error Handling:

// Returns proper HTTP status codes for different error scenarios.
// Logs errors to the console for debugging purposes.
// Token Generation and Storage:

// Uses a utility function generateTokenAndSetCookie to handle JWT creation and cookie setup, abstracting token-related logic.
// Security Considerations:

// Password Hashing: Ensures passwords are stored securely in the database.
// HTTP-Only Cookies: Stores JWTs in cookies with httpOnly to prevent client-side scripts from accessing them.
// Error Responses: Avoids revealing sensitive information in error messages.
// Database Interactions:

// Uses Mongoose to interact with MongoDB.
// Ensures fields like password are not exposed in responses by explicitly selecting necessary fields.