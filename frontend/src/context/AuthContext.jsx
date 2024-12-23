import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};





// 1. Import Statements
// javascript
// Copy code
// import { createContext, useContext, useState } from "react";
// createContext: Used to create a context object for managing global state.
// useContext: A React hook that allows you to access the context's value.
// useState: A React hook for managing local state in a functional component.
// 2. Context Creation
// javascript
// Copy code
// export const AuthContext = createContext();
// AuthContext: A context object created using createContext. This object will hold the authentication-related state and be accessible to components wrapped by its provider.
// 3. Custom Hook
// javascript
// Copy code
// export const useAuthContext = () => {
// 	return useContext(AuthContext);
// };
// useAuthContext:
// A custom hook that simplifies accessing the context's value.
// Internally uses useContext(AuthContext) to retrieve the context value.
// Purpose:
// Allows components to easily access AuthContext without importing useContext and AuthContext separately.
// 4. Context Provider
// javascript
// Copy code
// export const AuthContextProvider = ({ children }) => {
// AuthContextProvider:
// A component that wraps its children to provide the context value.
// It takes children as a prop, representing the child components that will have access to the context.
// State Management
// javascript
// Copy code
// const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
// authUser:
// Represents the authenticated user’s data (retrieved from local storage or initialized as null if not found).
// setAuthUser:
// A function to update the authUser state.
// JSON.parse(localStorage.getItem("chat-user")):
// Retrieves and parses the chat-user key from the browser’s localStorage.
// This is used to persist user authentication between page reloads.
// || null:
// Defaults to null if no data is found in local storage.
// Provider Setup
// javascript
// Copy code
// return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
// AuthContext.Provider:
// The component from AuthContext that provides the state and state updater function (authUser and setAuthUser) to all descendant components.
// value={{ authUser, setAuthUser }}:
// Specifies the values to be made available through the context.
// {children}:
// Renders the child components that will consume the context.
// 5. Export
// javascript
// Copy code
// export default AuthContextProvider;
// Exports AuthContextProvider so it can wrap the application or specific parts of the component tree to provide authentication context.
// How It Works
// Initialization: AuthContextProvider initializes authUser with data from local storage or null.
// Accessing Context:
// Use the useAuthContext hook to access authUser and setAuthUser in components.
// State Sharing:
// All components wrapped by AuthContextProvider can read and update the authUser state via the context.
// Usage Example
// Wrap your app or specific components with AuthContextProvider:

// jsx
// Copy code
// <AuthContextProvider>
// 	<App />
// </AuthContextProvider>
// Access the authentication state in a component:

// javascript
// Copy code
// import { useAuthContext } from "./path/to/AuthContext";

// const Component = () => {
// 	const { authUser, setAuthUser } = useAuthContext();

// 	return <div>Welcome {authUser?.name || "Guest"}</div>;
// };






