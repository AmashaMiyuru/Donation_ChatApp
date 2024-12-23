import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: { type: String },
  createdAt: { type: Date, default: Date.now },
  fileUrl: { type: String, default: "" },
		// createdAt, updatedAt
	},

	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;





// Importing Mongoose
// javascript
// Copy code
// import mongoose from "mongoose";
// import mongoose: Brings in the Mongoose library for creating schemas and models to interact with MongoDB.
// Defining the Message Schema
// javascript
// Copy code
// const messageSchema = new mongoose.Schema(
// const messageSchema: Creates a constant variable for the schema definition.
// new mongoose.Schema({...}): Creates a new schema object, defining the structure and rules for a Message document.
// senderId Field
// javascript
// Copy code
// 		senderId: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// senderId: Field to store the ID of the user who sent the message.
// type: mongoose.Schema.Types.ObjectId:
// Indicates the field stores an ObjectId (MongoDB's unique identifier).
// ref: "User":
// Specifies that the senderId references the User model.
// Enables population with user details using populate().
// required: true:
// Makes this field mandatory when creating a Message.
// receiverId Field
// javascript
// Copy code
// 		receiverId: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// receiverId: Field to store the ID of the user receiving the message.
// Same structure and behavior as senderId, except it represents the recipient.
// message Field
// javascript
// Copy code
// 		message: { type: String },
// message: Field to store the message text.
// type: String:
// Indicates this field holds a string value.
// createdAt Field
// javascript
// Copy code
//   createdAt: { type: Date, default: Date.now },
// createdAt: Field to store the date and time when the message was created.
// type: Date:
// Specifies this field holds a Date value.
// default: Date.now:
// Automatically sets the field to the current date and time when a message is created.
// Timestamps Option
// javascript
// Copy code
// 	},
// 	{ timestamps: true }
// );
// timestamps: true:
// Automatically adds createdAt and updatedAt fields to the schema.
// createdAt:
// Tracks when the document was first created.
// updatedAt:
// Updates whenever the document is modified.
// Create Mongoose Model
// javascript
// Copy code
// const Message = mongoose.model("Message", messageSchema);
// mongoose.model("Message", messageSchema):
// Creates a Mongoose model named Message using the messageSchema.
// Provides an interface for interacting with the messages collection in MongoDB.
// Message: A variable to store the created model.
// Exporting the Model
// javascript
// Copy code
// export default Message;
// export default Message:
// Exports the Message model as the default export.
// Allows other modules to import and use the Message model to interact with the messages collection.
// Summary
// This schema is for a messaging system where:

// senderId and receiverId: Link each message to users (referencing the User model).
// message: Stores the content of the message as a string.
// createdAt and updatedAt: Automatically track when the message is created or updated.





