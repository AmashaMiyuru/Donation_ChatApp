import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;




// 1. Imports
// javascript
// Copy code
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// useContext: A React hook used to consume a context created by React.createContext.
// AuthContext: A context object that holds authentication-related data and methods. It's imported from your AuthContext file in the context directory.
// 2. Custom Hook Definition
// javascript
// Copy code
// const useAuthContext = () => {
//   return useContext(AuthContext);
// };
// useAuthContext:
// A custom hook that wraps useContext(AuthContext).
// Simplifies accessing the AuthContext in components.
// Returns whatever value is provided by the AuthContext.Provider.
// 3. Export
// javascript
// Copy code
// export default useAuthContext;
// Default Export:
// Allows importing useAuthContext in other files without requiring curly braces.
// Key Features
// Simplifies Context Usage: Instead of importing both useContext and AuthContext in every component, you can import useAuthContext for cleaner and more readable code.
// Ensures Consistency: Provides a single entry point for accessing the authentication context, reducing potential errors.