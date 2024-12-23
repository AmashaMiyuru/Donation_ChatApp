import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import useAuthContext from "./hooks/useAuthContext"; 

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
			
		</div>
	);
}

export default App;




// Here is an explanation of each line in the App.js file:

// javascript
// Copy code
// import { Navigate, Route, Routes } from "react-router-dom";
// import { Navigate, Route, Routes } from "react-router-dom";:
// This imports the necessary components from the React Router library:
// Navigate: A component used to programmatically navigate or redirect the user to another route.
// Route: Defines a route in the application.
// Routes: A container component that holds all the Route components.
// javascript
// Copy code
// import "./App.css";
// import "./App.css";:
// This imports the CSS file (App.css) that contains styles for the application, so they can be applied to the components.
// javascript
// Copy code
// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import SignUp from "./pages/signup/SignUp";
// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import SignUp from "./pages/signup/SignUp";
// These import the Home, Login, and SignUp components from their respective file paths. These components represent different pages in the application.
// javascript
// Copy code
// import { Toaster } from "react-hot-toast";
// import { Toaster } from "react-hot-toast";:
// This imports the Toaster component from the react-hot-toast library. Toaster is used to display notifications throughout the app.
// javascript
// Copy code
// import useAuthContext from "./hooks/useAuthContext"; 
// import useAuthContext from "./hooks/useAuthContext";:
// This imports a custom hook called useAuthContext from the hooks folder. This hook is used to manage authentication-related state, such as checking if the user is logged in.
// javascript
// Copy code
// function App() {
// 	const { authUser } = useAuthContext();
// function App() {:
// This defines the App functional component, which is the main component for the application.
// const { authUser } = useAuthContext();:
// Inside the App component, the useAuthContext hook is called to retrieve the authUser object, which represents the current authenticated user. If the user is logged in, authUser will contain the user's information.
// javascript
// Copy code
// 	return (
// 		<div className='p-4 h-screen flex items-center justify-center'>
// return (:

// This begins the JSX returned by the App component.
// <div className='p-4 h-screen flex items-center justify-center'>:

// This div serves as the main container for the app's content. It uses utility classes from Tailwind CSS to apply the following styles:
// p-4: Padding around the content.
// h-screen: Makes the height of the div fill the entire screen.
// flex: Makes the div a flex container.
// items-center: Vertically centers the child elements.
// justify-center: Horizontally centers the child elements.
// javascript
// Copy code
// 			<Routes>
// <Routes>:
// This component acts as a wrapper for all route definitions. It renders the correct route based on the current URL.
// javascript
// Copy code
// 				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
// <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />:
// This defines a route for the homepage (/).
// If the authUser object exists (i.e., the user is authenticated), the Home component is rendered.
// If authUser does not exist (i.e., the user is not authenticated), the user is redirected to the /login page using the Navigate component.
// javascript
// Copy code
// 				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
// <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />:
// This defines a route for the /login path.
// If the user is already authenticated (authUser exists), they are redirected to the homepage (/).
// If the user is not authenticated, the Login component is rendered.
// javascript
// Copy code
// 				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
// <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />:
// This defines a route for the /signup path.
// If the user is authenticated, they are redirected to the homepage (/).
// If the user is not authenticated, the SignUp component is rendered.
// javascript
// Copy code
// 			</Routes>
// </Routes>:
// This closes the Routes container.
// javascript
// Copy code
// 			<Toaster />
// <Toaster />:
// This renders the Toaster component, which allows for displaying toast notifications across the application.
// javascript
// Copy code
// 		</div>
// 	);
// }
// </div>:

// This closes the main div container.
// );:

// This closes the JSX and the App component function.
// javascript
// Copy code
// export default App;
// export default App;:
// This exports the App component as the default export, making it available to be imported and used in other parts of the application (typically in index.js to render the app).
// Summary:
// The App.js file defines the routing and structure of the React application. It conditionally renders different pages (Home, Login, SignUp) based on whether the user is authenticated, utilizing React Router for navigation. Additionally, it includes the Toaster component for showing notifications.