import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;








// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";
// import jwt: Brings in the jsonwebtoken library for handling JSON Web Tokens (JWT).
// User: Imports the User Mongoose model to query the database.
// Middleware Function Definition
// javascript
// Copy code
// const protectRoute = async (req, res, next) => {
// const: Declares a constant variable for the middleware.
// protectRoute: Middleware function to protect routes by ensuring the user is authenticated.
// async: Marks the function as asynchronous, enabling await for asynchronous calls.
// (req, res, next): Parameters:
// req: Request object containing client-sent data.
// res: Response object for sending data back to the client.
// next: Function to pass control to the next middleware in the chain.
// Retrieve JWT from Cookies
// javascript
// Copy code
// 	try {
// 		const token = req.cookies.jwt;
// try: Starts a block to handle potential errors with catch.
// token: Stores the JWT from the client’s cookies.
// req.cookies: Contains cookies sent by the client (requires middleware like cookie-parser).
// .jwt: The name of the cookie storing the token.
// Handle Missing Token
// javascript
// Copy code
// 		if (!token) {
// 			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
// 		}
// if (!token): Checks if the token is missing.
// return: Ends the function early if no token is found.
// res.status(401): Sends a 401 Unauthorized status.
// .json({...}): Sends a JSON response with an error message.
// Verify Token
// javascript
// Copy code
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);
// decoded: Stores the payload decoded from the JWT.
// jwt.verify(token, process.env.JWT_SECRET):
// Verifies the token using the secret key (JWT_SECRET from the environment variables).
// Decodes the payload if the token is valid.
// Handle Invalid Token
// javascript
// Copy code
// 		if (!decoded) {
// 			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
// 		}
// if (!decoded): Checks if the decoding failed.
// res.status(401): Sends a 401 Unauthorized status for invalid tokens.
// Fetch User from Database
// javascript
// Copy code
// 		const user = await User.findById(decoded.userId).select("-password");
// user: Stores the user document retrieved from the database.
// await: Waits for the query to complete before proceeding.
// User.findById(decoded.userId):
// Uses the userId from the decoded JWT payload to find the user in the database.
// .select("-password"): Excludes the password field from the result for security.
// Handle Missing User
// javascript
// Copy code
// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}
// if (!user): Checks if no user was found.
// res.status(404): Sends a 404 Not Found status.
// Attach User to Request
// javascript
// Copy code
// 		req.user = user;
// req.user: Adds the authenticated user to the request object for use in subsequent middleware or route handlers.
// Proceed to Next Middleware
// javascript
// Copy code
// 		next();
// next(): Passes control to the next middleware or route handler in the chain.
// Handle Errors
// javascript
// Copy code
// 	} catch (error) {
// 		console.log("Error in protectRoute middleware: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// catch (error): Handles any errors thrown in the try block.
// console.log(...): Logs the error message to the console for debugging.
// res.status(500): Sends a 500 Internal Server Error status.
// .json({...}): Sends an error message as JSON.
// Export Middleware
// javascript
// Copy code
// export default protectRoute;
// export default: Makes the protectRoute middleware the default export of the module.
// Purpose
// This middleware:

// Ensures a valid JWT is provided in cookies.
// Verifies the JWT and extracts the user ID.
// Checks if the user exists in the database.
// Attaches the authenticated user to the request object.
// Protects routes by blocking unauthorized access.