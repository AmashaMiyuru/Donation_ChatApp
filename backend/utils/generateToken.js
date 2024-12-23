import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
};

export default generateTokenAndSetCookie;






// This code is a utility function used to generate a JWT (JSON Web Token) and set it as a cookie in the HTTP response. Here's a step-by-step explanation of each part:

// 1. Importing the JWT Library
// javascript
// Copy code
// import jwt from "jsonwebtoken";
// This imports the jsonwebtoken library, which is used to generate and verify JSON Web Tokens (JWT). JWT is commonly used for securely transmitting information between a client and a server as a JSON object.
// 2. The generateTokenAndSetCookie Function
// javascript
// Copy code
// const generateTokenAndSetCookie = (userId, res) => {
// generateTokenAndSetCookie: This is the function that generates the JWT and sets it as a cookie in the response.
// userId: The unique identifier for the user, typically provided after the user logs in.
// res: The Express response object, which allows you to manipulate the HTTP response, such as setting cookies.
// 3. Generating the JWT
// javascript
// Copy code
// const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// 	expiresIn: "15d",
// });
// jwt.sign(): This method creates a new JWT.
// Payload: { userId } – The payload of the JWT, which contains the userId. This is the data stored in the token that can be accessed by the server or client.
// Secret: process.env.JWT_SECRET – The secret used to sign the token. It is stored in the environment variables (process.env.JWT_SECRET) to keep it secure.
// Options: { expiresIn: "15d" } – This option sets the expiration time for the token. In this case, the token will expire in 15 days (15d).
// 4. Setting the Cookie with the JWT
// javascript
// Copy code
// res.cookie("jwt", token, {
// 	maxAge: 15 * 24 * 60 * 60 * 1000, // MS
// 	httpOnly: true, // prevent XSS attacks
// 	sameSite: "strict", // prevent CSRF attacks
// 	secure: process.env.NODE_ENV !== "development",
// });
// res.cookie(): This method sets a cookie on the client's browser. It is used to store the JWT so that it can be sent with subsequent requests for authentication purposes.
// Name: "jwt" – The name of the cookie, which will be jwt. This is the identifier for the cookie.
// Value: token – The value of the cookie is the JWT that was generated earlier.
// Options:
// maxAge: 15 * 24 * 60 * 60 * 1000 – The maximum age of the cookie in milliseconds. This is set to 15 days (the same as the JWT expiration). The cookie will expire after this duration.
// httpOnly: true – This flag prevents the cookie from being accessed by JavaScript in the client browser, helping to mitigate Cross-Site Scripting (XSS) attacks.
// sameSite: "strict" – This flag restricts the cookie to be sent only for same-site requests, which helps prevent Cross-Site Request Forgery (CSRF) attacks.
// secure: process.env.NODE_ENV !== "development" – This flag ensures that the cookie is only sent over HTTPS when in production mode (process.env.NODE_ENV !== "development"). In development mode, the cookie can be sent over HTTP for convenience, but in production, it is safer to send it over HTTPS.
// 5. Exporting the Function
// javascript
// Copy code
// export default generateTokenAndSetCookie;
// This line exports the generateTokenAndSetCookie function, making it available to other parts of the application, so it can be reused wherever you need to generate and set a JWT as a cookie.
// Summary
// This function does two main things:

// It generates a JWT containing the user's userId that will be used for authenticating the user in future requests.
// It sets this JWT as a secure, HTTP-only cookie on the user's browser, ensuring it is sent with subsequent HTTP requests to authenticate the user.
// JWT Generation: The JWT is created with a secret and has a lifespan of 15 days.
// Cookie Setting: The JWT is stored as a cookie with security flags to prevent XSS, CSRF, and to ensure secure transmission via HTTPS in production.