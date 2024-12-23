import axios from 'axios';

export const fetchUsersByRole = async (role) => {
  try {
    const response = await axios.get(`/api/users/${role}`);
    
    // Validate that the data is an array
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid data format returned from API');
    }
    
    return response.data; // Returns an array of users or empty array if none found
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error; // Rethrow for further handling if needed
  }
};

export const fetchLoggedInUserRole = async () => {
  try {
    const response = await axios.get(`/api/users/auth/loggedInUserRole`);

    // Ensure you're returning the role data here
    if (!response.data.role) {
      throw new Error('Role not found in the response');
    }

    return response.data.role;
  } catch (error) {
    console.error("Error fetching logged-in user role:", error);
    throw error; // Rethrow for further handling if needed
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error; // Re-throw to handle in the calling component
  }
};





// This code is for handling API calls related to fetching user data based on their role and the logged-in user's role, using Axios, a promise-based HTTP client for JavaScript. Below is a detailed explanation of each function:

// 1. fetchUsersByRole Function
// javascript
// Copy code
// export const fetchUsersByRole = async (role) => {
//   try {
//     const response = await axios.get(`/api/users/${role}`);
    
//     // Validate that the data is an array
//     if (!Array.isArray(response.data)) {
//       throw new Error('Invalid data format returned from API');
//     }
    
//     return response.data; // Returns an array of users or empty array if none found
//   } catch (error) {
//     console.error("Error fetching users by role:", error);
//     throw error; // Rethrow for further handling if needed
//   }
// };
// Purpose: This function fetches users by their role (such as donator, recipient, admin, etc.).
// API Request: It sends a GET request to the endpoint /api/users/${role}, where ${role} is a dynamic parameter passed into the function (e.g., donator, admin).
// Data Validation: After receiving the response, it checks whether the returned data is an array (Array.isArray(response.data)). If it's not, an error is thrown indicating that the data format is invalid.
// Error Handling: If any error occurs during the API call or data validation, the error is logged and rethrown so that it can be handled further up in the call stack (in the calling component).
// 2. fetchLoggedInUserRole Function
// javascript
// Copy code
// export const fetchLoggedInUserRole = async () => {
//   try {
//     const response = await axios.get(`/api/users/auth/loggedInUserRole`);

//     // Ensure you're returning the role data here
//     if (!response.data.role) {
//       throw new Error('Role not found in the response');
//     }

//     return response.data.role;
//   } catch (error) {
//     console.error("Error fetching logged-in user role:", error);
//     throw error; // Rethrow for further handling if needed
//   }
// };
// Purpose: This function fetches the role of the logged-in user.
// API Request: It sends a GET request to the endpoint /api/users/auth/loggedInUserRole.
// Data Validation: It checks if the role exists in the response (response.data.role). If the role is missing, it throws an error indicating that the role was not found in the response.
// Error Handling: If there is an error while making the API request or validating the response, the error is logged and rethrown for further handling.
// 3. fetchAllUsers Function
// javascript
// Copy code
// export const fetchAllUsers = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/users");
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching all users:', error);
//     throw error; // Re-throw to handle in the calling component
//   }
// };
// Purpose: This function fetches a list of all users.
// API Request: It sends a GET request to the endpoint http://localhost:5000/api/users. This is a hardcoded URL for fetching all users, unlike the other two functions where dynamic endpoints are used.
// Error Handling: If an error occurs during the API call (e.g., network issues, server errors), it logs the error and rethrows it for further handling.
// General Explanation:
// Axios GET Requests: All three functions use Axios to make HTTP GET requests to various API endpoints.
// Error Handling: Each function is wrapped in a try-catch block. In case of an error, the error is logged to the console, and then it's rethrown so the calling component or context can handle it.
// Return Data: Each function returns the fetched data (response.data), but with additional checks to ensure the data format is correct (e.g., checking if the data is an array or if the role is present in the response).
// Re-throwing Errors: If any errors occur during the API requests or data validation, the errors are logged and then rethrown for further handling by the caller. This is useful when these functions are called in other parts of the application where the error needs to be handled appropriately (e.g., showing a message to the user).
// Usage:
// These functions are likely used in a React or JavaScript-based frontend to interact with a backend API that manages user roles and user data. You would call these functions from a component to get users by role, the logged-in user's role, or all users.






