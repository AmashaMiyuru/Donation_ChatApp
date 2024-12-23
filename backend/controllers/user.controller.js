import User from "../models/user.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get users by role
export const getUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const users = await User.find({ role }); // Find users with the specified role
        res.status(200).json(users); // Return users (empty array if none found)
    } catch (error) {
        console.error("Error fetching users by role:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get the logged-in user's role
export const getLoggedInUserRole = async (req, res) => {
    try {
        const userId = req.user._id; // Ensure req.user is populated by authentication middleware
        const user = await User.findById(userId).select('role'); // Fetch user by ID and select only the role field

        if (!user) {
            return res.status(404).json({ error: "User not found" }); // Return 404 if user is not found
        }

        res.status(200).json({ role: user.role }); // Send back the user's role
    } catch (error) {
        console.error("Error fetching logged-in user role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Import Statements
// javascript
// Copy code
// import User from "../models/user.model.js";
// import: Used to bring in functionality from another module.
// User: Represents the Mongoose model for the User collection in the database.
// from: Specifies the source module.
// "../models/user.model.js": Path to the file defining the User model.
// 1. getAllUsers Function
// javascript
// Copy code
// export const getAllUsers = async (req, res) => {
// export: Makes the function available to other files.
// const: Declares a constant.
// getAllUsers: Function name describing its purpose (to fetch all users).
// async: Marks the function as asynchronous, enabling the use of await.
// (req, res): Function parameters for handling the request and response.
// javascript
// Copy code
//     try {
//         const users = await User.find(); // Fetch all users
// try: Starts a block of code that handles errors using catch.
// const: Declares a variable that won’t be reassigned.
// users: Variable to store the fetched users.
// =: Assignment operator.
// await: Pauses execution until the find operation completes.
// User.find(): Mongoose query to fetch all documents in the User collection.
// javascript
// Copy code
//         res.status(200).json(users);
// res: The response object.
// status(200): Sets the HTTP status code to 200 OK.
// .json(users): Sends the users data as a JSON response.
// javascript
// Copy code
//     } catch (error) {
//         console.error("Error fetching all users:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// catch: Handles errors thrown in the try block.
// error: The error object.
// console.error(...): Logs the error to the console.
// res.status(500): Sends a 500 Internal Server Error response.
// .json({ message: ... }): Sends an error message as JSON.
// 2. getUsersByRole Function
// javascript
// Copy code
// export const getUsersByRole = async (req, res) => {
// getUsersByRole: Function name describing its purpose (to fetch users by role).
// javascript
// Copy code
//     const { role } = req.params;
// const: Declares a variable.
// { role }: Destructures role from req.params.
// req.params: Contains route parameters (e.g., /users/:role).
// javascript
// Copy code
//     try {
//         const users = await User.find({ role }); // Find users with the specified role
// User.find({ role }): Mongoose query to fetch users whose role matches the parameter.
// javascript
// Copy code
//         res.status(200).json(users); // Return users (empty array if none found)
// Same as above.
// javascript
// Copy code
//     } catch (error) {
//         console.error("Error fetching users by role:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// Same as above.
// 3. getLoggedInUserRole Function
// javascript
// Copy code
// export const getLoggedInUserRole = async (req, res) => {
// getLoggedInUserRole: Function name describing its purpose (to fetch the logged-in user’s role).
// javascript
// Copy code
//     try {
//         const userId = req.user._id;
// userId: Variable to store the logged-in user’s ID.
// req.user: Assumes the authentication middleware has populated the request object with the logged-in user’s data.
// _id: MongoDB’s unique identifier for a document.
// javascript
// Copy code
//         const user = await User.findById(userId).select('role');
// User.findById(userId): Mongoose query to fetch a user by their ID.
// .select('role'): Only retrieves the role field, optimizing the query.
// javascript
// Copy code
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
// if (!user): Checks if the user does not exist.
// return: Exits the function early.
// res.status(404): Sends a 404 Not Found response.
// javascript
// Copy code
//         res.status(200).json({ role: user.role });
// role: user.role: Sends the user’s role as part of the response.
// javascript
// Copy code
//     } catch (error) {
//         console.error("Error fetching logged-in user role:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// Same as above.
// Summary
// This code provides three endpoints:

// getAllUsers: Fetches all users from the database.
// getUsersByRole: Retrieves users filtered by their role.
// getLoggedInUserRole: Returns the role of the currently logged-in user.
// It uses:

// Mongoose for database queries.
// async/await for asynchronous operations.
// Error handling with try/catch.
// HTTP status codes for meaningful responses.