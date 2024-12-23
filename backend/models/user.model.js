import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		role: {
			type: String,
			enum: ['recipient', 'donator', 'admin', 'crew_member'],
			default: 'recipient', // Default value if not specified
		  },
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;








// Importing Mongoose
// javascript
// Copy code
// import mongoose from "mongoose";
// import mongoose: This line imports the Mongoose library, which is a MongoDB object modeling tool for Node.js. It simplifies working with MongoDB by providing a higher-level abstraction for creating and managing database documents.
// Defining the User Schema
// javascript
// Copy code
// const userSchema = new mongoose.Schema(
// const userSchema: This creates a constant to hold the schema definition for a User.
// new mongoose.Schema({...}): The schema defines the structure, data types, and constraints for the User model. It specifies how the user data will be stored in MongoDB.
// fullName Field
// javascript
// Copy code
// 		fullName: {
// 			type: String,
// 			required: true,
// 		},
// fullName: This field represents the user's full name.
// type: String: Specifies that the fullName field will store a string.
// required: true: This field is required; the user must provide a full name when creating a User.
// username Field
// javascript
// Copy code
// 		username: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// username: Represents the username for the user.
// type: String: Specifies the data type of the username field (a string).
// required: true: The username field is mandatory.
// unique: true: Ensures that each username is unique in the database, meaning no two users can have the same username.
// password Field
// javascript
// Copy code
// 		password: {
// 			type: String,
// 			required: true,
// 			minlength: 6,
// 		},
// password: Represents the user's password.
// type: String: Specifies the password field will store a string.
// required: true: This field is required for creating a User.
// minlength: 6: The password field must be at least 6 characters long.
// gender Field
// javascript
// Copy code
// 		gender: {
// 			type: String,
// 			required: true,
// 			enum: ["male", "female"],
// 		},
// gender: Represents the user's gender.
// type: String: Specifies the gender field is a string.
// required: true: This field is mandatory.
// enum: ["male", "female"]: Restricts the value of gender to either "male" or "female". This ensures that only one of these two options is stored.
// profilePic Field
// javascript
// Copy code
// 		profilePic: {
// 			type: String,
// 			default: "",
// 		},
// profilePic: Stores the URL or path to the user's profile picture.
// type: String: Specifies that profilePic will store a string (URL or file path).
// default: "": If no value is provided for profilePic, it will default to an empty string, indicating no profile picture.
// role Field
// javascript
// Copy code
// 		role: {
// 			type: String,
// 			enum: ['recipient', 'donator', 'admin', 'crew_member'],
// 			default: 'recipient', // Default value if not specified
// 		  },
// role: Represents the user's role in the system (e.g., recipient, donator, admin, or crew member).
// type: String: Specifies that the role field is a string.
// enum: ['recipient', 'donator', 'admin', 'crew_member']: Restricts the values of role to be one of these four options: "recipient", "donator", "admin", or "crew_member".
// default: 'recipient': If no role is specified when creating a user, it will default to "recipient".
// Timestamps Option
// javascript
// Copy code
// 	},
// 	{ timestamps: true }
// );
// timestamps: true: Adds two additional fields to the schema automatically: createdAt and updatedAt.
// createdAt: Stores the date and time when the user document was created.
// updatedAt: Stores the date and time when the user document was last updated.
// Create Mongoose Model
// javascript
// Copy code
// const User = mongoose.model("User", userSchema);
// mongoose.model("User", userSchema): This line creates a Mongoose model named User using the userSchema. The model represents the users collection in MongoDB.
// User: This variable stores the Mongoose model and can be used to interact with the users collection in the database, e.g., creating, finding, updating, and deleting user documents.
// Exporting the Model
// javascript
// Copy code
// export default User;
// export default User: This exports the User model so that it can be used in other files.
// It allows you to import and use the User model to interact with the users collection in other parts of your application.
// Summary
// This schema defines the structure of a User document:

// fullName, username, password, and gender: Required fields for each user.
// profilePic: An optional field for storing a profile picture, with a default empty string.
// role: Specifies the role of the user in the system, defaulting to "recipient".
// timestamps: Automatically adds createdAt and updatedAt fields to track when the user was created and last updated.