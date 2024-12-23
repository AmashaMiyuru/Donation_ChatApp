import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer"; // Import multer for file handling
import cors from "cors"; // Import cors
import { sendMessage } from './controllers/message.controller.js'; // Import the sendMessage controller
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import { getUsersByRole, getLoggedInUserRole } from './controllers/user.controller.js'; // Ensure you import getLoggedInUserRole
import  protectRoute from "./middleware/protectRoute.js";

dotenv.config(); // Load environment variables from .env file
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json()); // to parse incoming requests with JSON payloads
app.use(cookieParser());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage }); // Initialize multer with the storage engine

// Routes
app.get('/api/users/:role', getUsersByRole);

// Fetch logged-in user role route
app.get('/api/users/loggedInUserRole', protectRoute, getLoggedInUserRole); // Moved protectRoute here
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.post('/api/messages/send/:conversationId', sendMessage);

// Static file serving for frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Adjusted path for clarity

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Handle file saving logic here (e.g., save to disk, cloud storage, etc.)
    console.log("File uploaded:", file.originalname);
    res.status(200).json({ message: "File uploaded successfully", file: file.originalname });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Catch-all route for serving the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server and connect to MongoDB
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});






// This code is an Express.js server setup that includes several key features such as routing, file handling, middleware configuration, and database connection. Below is a detailed explanation of what each part of the code does:

// 1. Importing Required Libraries
// javascript
// Copy code
// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import multer from "multer";
// import cors from "cors";
// import { sendMessage } from './controllers/message.controller.js';
// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import connectToMongoDB from "./db/connectToMongoDB.js";
// import { app, server } from "./socket/socket.js";
// import { getUsersByRole, getLoggedInUserRole } from './controllers/user.controller.js';
// import protectRoute from "./middleware/protectRoute.js";
// path: Provides utilities for working with file and directory paths.
// express: A lightweight web framework for Node.js to build APIs and web applications.
// dotenv: Loads environment variables from a .env file.
// cookie-parser: Parses cookies sent with HTTP requests.
// multer: A middleware for handling multipart/form-data, which is used for uploading files.
// cors: A middleware to handle Cross-Origin Resource Sharing (CORS), allowing cross-origin requests.
// controllers: Functions (sendMessage, getUsersByRole, getLoggedInUserRole) that handle specific business logic for messages and users.
// routes: Import route files (auth.routes.js, message.routes.js, user.routes.js) to manage authentication, messaging, and user-related routes.
// connectToMongoDB: A function that connects to MongoDB.
// socket.js: Handles WebSocket connections (likely for real-time messaging).
// protectRoute: Middleware that ensures the user is authenticated before accessing certain routes.

// 2. Setting up Environment Variables and Constants
// javascript
// Copy code
// dotenv.config(); // Load environment variables from .env file
// const __dirname = path.resolve();
// const PORT = process.env.PORT || 5000;
// dotenv.config(): Loads the environment variables from a .env file into process.env.
// __dirname: Resolves the absolute path of the current directory.
// PORT: Sets the port number the server will listen on. Defaults to 5000 if not defined in the environment variables.

// 3. Middleware Configuration
// javascript
// Copy code
// app.use(cors({
//   origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
//   credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());
// cors(): Configures the Cross-Origin Resource Sharing middleware, allowing only specific origins (localhost:3000 or 127.0.0.1:3000) to make requests to the server. This is useful for frontend-backend communication during development.
// express.json(): Middleware to parse incoming JSON request bodies.
// cookieParser(): Middleware to parse cookies attached to the incoming requests.

// 4. Multer File Upload Configuration
// javascript
// Copy code
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });
// multer.diskStorage(): Configures how and where files are stored:
// destination: Files will be saved in the uploads/ directory.
// filename: A unique filename is generated for each file using the current timestamp and a random number to avoid filename conflicts. The original file extension is maintained.
// upload: This is the initialized multer instance using the specified storage configuration.

// 5. Routes
// javascript
// Copy code
// app.get('/api/users/:role', getUsersByRole);
// app.get('/api/users/loggedInUserRole', protectRoute, getLoggedInUserRole);
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);
// app.post('/api/messages/send/:conversationId', sendMessage);
// /api/users/:role: A route that handles fetching users by their role.
// /api/users/loggedInUserRole: A route that fetches the logged-in user's role, protected by the protectRoute middleware.
// /api/auth, /api/messages, /api/users: These routes link to the authentication, messaging, and user-related routes defined in the respective route files (auth.routes.js, message.routes.js, user.routes.js).
// /api/messages/send/:conversationId: A POST route for sending a message in a specific conversation.

// 6. Static File Serving
// javascript
// Copy code
// app.use(express.static(path.join(__dirname, "frontend", "dist")));
// express.static(): Serves static files from the frontend/dist directory. This is typically used for serving a frontend application built with a framework like React or Vue.
// 7. File Upload Route
// javascript
// Copy code
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
//     console.log("File uploaded:", file.originalname);
//     res.status(200).json({ message: "File uploaded successfully", file: file.originalname });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// upload.single("file"): Handles file uploads. The uploaded file will be available in req.file. The "file" is the name of the form field.
// If the upload is successful, the server logs the file's name and returns a success message. If no file is uploaded, a 400 error is sent.
// 8. Catch-All Route for Serving Frontend
// javascript
// Copy code
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });
// This catch-all route sends the index.html file from the frontend/dist directory when no other route matches. It's typically used for single-page applications (SPA) where the frontend is built and served by the same backend.
// 9. Starting the Server
// javascript
// Copy code
// server.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server Running on port ${PORT}`);
// });
// server.listen(): Starts the server on the specified port (PORT). The callback connects to MongoDB (connectToMongoDB()) and logs a success message when the server starts.
// Summary
// Express.js is used to handle routing, middleware, and serving the frontend.
// File uploads are managed using Multer.
// CORS is configured to allow specific origins for cross-origin requests.
// JWT Authentication is handled with middleware, and protected routes ensure that certain actions require authentication.
// MongoDB is connected at the start of the server to interact with the database.