import express from "express";
import { getAllUsers, getUsersByRole, getLoggedInUserRole } from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// Route to create a new user
router.post('/', async (req, res) => {
    const { fullName, username, password, gender, role } = req.body;
    try {
        const newUser = new User({ fullName, username, password, gender, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Other user routes
router.get('/auth/loggedInUserRole', protectRoute, getLoggedInUserRole); 
router.get('/:role', getUsersByRole);
router.get('/', getAllUsers); // Optional: Get all users

export default router;




// 1. Import statements
// javascript
// Copy code
// import express from "express";
// import { getAllUsers, getUsersByRole, getLoggedInUserRole } from '../controllers/user.controller.js';
// import protectRoute from '../middleware/protectRoute.js';
// express: Importing the Express library to create routes and handle HTTP requests.
// getAllUsers, getUsersByRole, getLoggedInUserRole: These are imported functions from the user.controller.js file that handle the logic for retrieving users based on certain criteria.
// protectRoute: This is a middleware function imported from the protectRoute.js file, used to protect certain routes from unauthorized access.
// 2. Router Setup
// javascript
// Copy code
// const router = express.Router();
// express.Router(): Creating a new instance of the Express Router. The router allows you to define route handlers (GET, POST, etc.) for different paths, which will be later attached to an Express application.
// 3. POST Route to Create a New User
// javascript
// Copy code
// router.post('/', async (req, res) => {
//     const { fullName, username, password, gender, role } = req.body;
//     try {
//         const newUser = new User({ fullName, username, password, gender, role });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// });
// POST /: This route handles the creation of a new user. It listens for POST requests to the root of the user endpoint.
// req.body: Extracts the necessary data (fullName, username, password, gender, role) from the request body, which is expected to be sent when creating a user.
// new User({ ... }): Creates a new User object using the data from the request body.
// await newUser.save(): Saves the new user to the database (assumed to be MongoDB with Mongoose).
// res.status(201).json(newUser): Sends a success response with the new user data and a status code 201 (created).
// catch block: If there's an error during the process, it sends a response with a 500 status code and an error message.
// 4. GET Route to Fetch Logged-In User's Role
// javascript
// Copy code
// router.get('/auth/loggedInUserRole', protectRoute, getLoggedInUserRole);
// GET /auth/loggedInUserRole: This route listens for a GET request to /auth/loggedInUserRole and uses two middleware functions:
// protectRoute: Ensures that the user is authenticated before accessing the route.
// getLoggedInUserRole: This function (from user.controller.js) retrieves the role of the logged-in user.
// 5. GET Route to Fetch Users by Role
// javascript
// Copy code
// router.get('/:role', getUsersByRole);
// GET /:role: This route listens for GET requests where :role is a dynamic parameter (e.g., /admin, /donator, etc.).
// getUsersByRole: This function (from user.controller.js) retrieves all users that match the specified role. For example, /admin would return all users with the role "admin".
// 6. GET Route to Fetch All Users
// javascript
// Copy code
// router.get('/', getAllUsers); 
// GET /: This route listens for GET requests to the root of the user endpoint and retrieves all users.
// getAllUsers: This function (from user.controller.js) fetches all the users from the database.
// 7. Export the Router
// javascript
// Copy code
// export default router;
// This line exports the configured router so it can be used in the main Express application.
// Summary
// This code defines a set of routes for user management, including:
// POST /: Create a new user.
// GET /auth/loggedInUserRole: Fetch the logged-in user's role (protected route).
// GET /:role: Get all users by a specific role.
// GET /: Get all users in the system.
// The routes rely on the protectRoute middleware for authentication and on controller functions to handle the business logic.





