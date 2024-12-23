import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;







// Importing Dependencies
// javascript
// Copy code
// import express from "express";
// import { login, logout, signup } from "../controllers/auth.controller.js";
// import express from "express";: This line imports the express module, which is a web application framework for Node.js. It simplifies the creation of routes, handling requests, and sending responses.
// import { login, logout, signup } from "../controllers/auth.controller.js";: This imports three functions (login, logout, and signup) from the auth.controller.js file. These functions handle the logic for logging in, logging out, and signing up a user.
// Creating the Router
// javascript
// Copy code
// const router = express.Router();
// const router = express.Router();: This creates a new router instance using Express's Router() method. The router is used to define and manage routes that handle HTTP requests. It helps in organizing the code into smaller, modular pieces.
// Defining Routes
// javascript
// Copy code
// router.post("/signup", signup);
// router.post("/signup", signup);: This defines a POST route for the /signup endpoint.
// When a POST request is made to /signup, the signup function (imported from the controller) will handle the request. This is where the logic for registering a new user is implemented.
// javascript
// Copy code
// router.post("/login", login);
// router.post("/login", login);: This defines a POST route for the /login endpoint.
// When a POST request is made to /login, the login function (imported from the controller) will handle the request. This is where the logic for authenticating a user is implemented.
// javascript
// Copy code
// router.post("/logout", logout);
// router.post("/logout", logout);: This defines a POST route for the /logout endpoint.
// When a POST request is made to /logout, the logout function (imported from the controller) will handle the request. This is where the logic for logging out the user is implemented.
// Exporting the Router
// javascript
// Copy code
// export default router;
// export default router;: This exports the router instance, allowing it to be used in other parts of the application. Typically, this router would be imported into the main server file (e.g., app.js or server.js) and then mounted onto the application to handle requests at the specified endpoints.
// Summary of Functionality
// /signup route: Accepts POST requests and triggers the signup controller function to handle user registration.
// /login route: Accepts POST requests and triggers the login controller function to authenticate users.
// /logout route: Accepts POST requests and triggers the logout controller function to log users out.
// This setup makes it easy to handle user authentication routes and keeps the code modular by separating the route handling and business logic (controllers).











