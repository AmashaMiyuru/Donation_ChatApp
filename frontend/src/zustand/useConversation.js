import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages: Array.isArray(messages) ? messages : [] }),
}));

export default useConversation;



// Here is an explanation of each line of the provided code for the useConversation store using Zustand, a state management library for React:

// javascript
// Copy code
// import { create } from "zustand";
// import { create } from "zustand";:
// This line imports the create function from the Zustand library. create is used to define and create a store, which holds and manages the application state.
// javascript
// Copy code
// const useConversation = create((set) => ({
// const useConversation = create((set) => ({:
// This line initializes the Zustand store with the create function. It defines the useConversation store, which can be used in components to access and modify the conversation state.
// The argument to create is a function that receives set as an argument. set is used to update the store's state.
// javascript
// Copy code
//   selectedConversation: null,
// selectedConversation: null,:
// This defines the initial state for selectedConversation, which is set to null. It represents the currently selected conversation in the application. This will be updated later when a user selects a conversation.
// javascript
// Copy code
//   setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// setSelectedConversation: (selectedConversation) => set({ selectedConversation }),:
// This line defines an action (a function) called setSelectedConversation. It updates the state of selectedConversation. When called, it passes the new selectedConversation value and updates the state with it.
// The set function updates the state inside the store. It receives an object with the new state values. In this case, it's only updating the selectedConversation.
// javascript
// Copy code
//   messages: [],
// messages: [],:
// This line defines the initial state for messages as an empty array. It represents the list of messages in the current conversation.
// javascript
// Copy code
//   setMessages: (messages) => set({ messages: Array.isArray(messages) ? messages : [] }),
// setMessages: (messages) => set({ messages: Array.isArray(messages) ? messages : [] }),:
// This line defines another action called setMessages. It updates the messages state.
// It first checks if the provided messages is an array using Array.isArray(messages). If it is, it updates the state with the messages array; otherwise, it sets it to an empty array [].
// javascript
// Copy code
// }));
// ));:
// This closing parenthesis and bracket marks the end of the object passed to create. This object defines the state (selectedConversation, messages) and the actions (setSelectedConversation, setMessages) that will modify the state.
// javascript
// Copy code
// export default useConversation;
// export default useConversation;:
// This line exports the useConversation store as the default export of the module. This allows other components to import and use the useConversation store for managing conversation-related state.
// Summary
// The code creates a Zustand store for managing conversation-related state in a React app. It contains:

// selectedConversation: Holds the currently selected conversation.
// setSelectedConversation: An action to update the selected conversation.
// messages: Holds the messages for the selected conversation.
// setMessages: An action to update the list of messages.
// By using this store, components can access and modify the conversation state globally within the application.