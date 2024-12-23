import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;








// Importing Mongoose
// javascript
// Copy code
// import mongoose from "mongoose";
// import mongoose: Imports the mongoose library to work with MongoDB using schemas and models.
// Define Conversation Schema
// javascript
// Copy code
// const conversationSchema = new mongoose.Schema(
// const: Declares a constant variable for the schema.
// conversationSchema: Defines the structure for a Conversation document.
// new mongoose.Schema({...}): Creates a new schema object for the Conversation model, which specifies the fields and their data types.
// Participants Field
// javascript
// Copy code
// 	{
// 		participants: [
// 			{
// 				type: mongoose.Schema.Types.ObjectId,
// 				ref: "User",
// 			},
// 		],
// participants: Field to store an array of participants in the conversation.
// [ ]: Indicates this field is an array.
// type: mongoose.Schema.Types.ObjectId:
// Specifies that each participant is stored as an ObjectId (a unique MongoDB identifier).
// ref: "User":
// Indicates this field references the User model.
// Allows Mongoose to populate this field with user details using populate().
// Messages Field
// javascript
// Copy code
// 		messages: [
// 			{
// 				type: mongoose.Schema.Types.ObjectId,
// 				ref: "Message",
// 				default: [],
// 			},
// 		],
// messages: Field to store an array of message references in the conversation.
// [ ]: Indicates this field is an array.
// type: mongoose.Schema.Types.ObjectId:
// Specifies that each message is stored as an ObjectId.
// ref: "Message":
// Indicates this field references the Message model.
// Allows Mongoose to populate this field with message details using populate().
// default: []:
// Sets the default value of this field to an empty array if not provided.
// Timestamps Option
// javascript
// Copy code
// 	},
// 	{ timestamps: true }
// );
// timestamps: true:
// Automatically adds createdAt and updatedAt fields to the schema.
// These fields store the timestamps for when a document is created and last updated.
// Create Mongoose Model
// javascript
// Copy code
// const Conversation = mongoose.model("Conversation", conversationSchema);
// mongoose.model("Conversation", conversationSchema):
// Creates a Mongoose model named Conversation using the defined conversationSchema.
// This model provides an interface to interact with the conversations collection in MongoDB.
// Conversation: Variable to store the created model.
// Export Model
// javascript
// Copy code
// export default Conversation;
// export default Conversation:
// Makes the Conversation model the default export of this module.
// Allows other files to import and use this model to interact with the conversations collection.
// Summary
// This code defines a schema for a conversation system:

// Participants: Array of user IDs (referencing the User model).
// Messages: Array of message IDs (referencing the Message model).
// Automatically tracks creation and update timestamps.





