import express from "express";
import multer from "multer";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/upload.js";  // Adjust the upload destination as needed

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, upload.single("file"), sendMessage); // Use multer to handle file upload


export default router;






// Here’s an explanation of the code:

// Importing Dependencies
// javascript
// Copy code
// import express from "express";
// import multer from "multer";
// import { getMessages, sendMessage } from "../controllers/message.controller.js";
// import protectRoute from "../middleware/protectRoute.js";
// import upload from "../middleware/upload.js";  // Adjust the upload destination as needed
// import express from "express";: This imports the express module, a web application framework for Node.js. It simplifies the process of creating routes, handling requests, and sending responses.

// import multer from "multer";: This imports the multer module, which is used for handling multipart/form-data, typically used for file uploads in HTTP requests.

// import { getMessages, sendMessage } from "../controllers/message.controller.js";: This imports two controller functions (getMessages and sendMessage) from the message.controller.js file. These functions handle the logic for retrieving messages and sending messages, respectively.

// import protectRoute from "../middleware/protectRoute.js";: This imports the protectRoute middleware, which is used to protect certain routes by ensuring the user is authenticated before accessing them.

// import upload from "../middleware/upload.js";: This imports the upload middleware, which is used to handle file uploads. It is used to configure multer and specify where to save the uploaded files and other configurations.

// Creating the Router
// javascript
// Copy code
// const router = express.Router();
// const router = express.Router();: This creates a new instance of an Express router, which will be used to define the routes and associate them with controller functions.
// Defining Routes
// GET /:id - getMessages

// javascript
// Copy code
// router.get("/:id", protectRoute, getMessages);
// Route: This defines a GET route with a dynamic id parameter (/:id).
// Middleware: The protectRoute middleware is applied first to ensure that only authenticated users can access this route.
// Controller: Once the route is validated (i.e., the user is authenticated), the getMessages function from the message.controller.js is called to fetch messages between users.
// The id parameter is likely the user’s ID, used to retrieve messages for a specific conversation.
// POST /send/:id - sendMessage

// javascript
// Copy code
// router.post("/send/:id", protectRoute, upload.single("file"), sendMessage);
// Route: This defines a POST route with a dynamic id parameter (/send/:id).
// Middleware: The protectRoute middleware ensures that only authenticated users can send messages.
// Multer File Handling: The upload.single("file") middleware is used to handle file uploads.
// This middleware processes the file upload in the form data with the key "file", using multer to store the file (typically in a specific directory). The single("file") method indicates that only one file is being uploaded.
// Controller: After the file is uploaded, the sendMessage function from message.controller.js is called to send the message (along with the uploaded file, if any).
// This function is responsible for sending the message to the correct recipient and possibly saving the message to the database.
// Exporting the Router
// javascript
// Copy code
// export default router;
// export default router;: This exports the router instance, allowing it to be used in other parts of the application. The router can be imported and mounted in the main server file (e.g., app.js or server.js) to handle the defined routes.
// Summary of Functionality
// GET /:id route:
// Fetches messages between users. The user’s identity is verified by protectRoute, and if authenticated, the getMessages function is called to retrieve the messages.
// POST /send/:id route:
// Allows authenticated users to send messages, optionally including a file.
// The protectRoute middleware ensures the user is authenticated.
// The upload.single("file") middleware handles file uploads.
// The sendMessage function is responsible for sending the message and possibly handling the file.
// This setup is commonly used in messaging applications where users can send and receive messages, sometimes including attachments. The file upload functionality is handled via multer, and routes are protected by the protectRoute middleware to ensure users are authenticated.






