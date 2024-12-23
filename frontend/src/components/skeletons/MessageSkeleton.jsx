const MessageSkeleton = () => {
	return (
		<>
			<div className='flex gap-3 items-center'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};
export default MessageSkeleton;




// The MessageSkeleton component is a placeholder used to indicate loading while actual messages are being fetched. It provides a visual representation of how messages will appear once loaded.

// Here’s a detailed explanation of each line of the code:

// Component Declaration
// javascript
// Copy code
// const MessageSkeleton = () => {
// MessageSkeleton: A functional React component. It does not take any props as it is solely for displaying a static skeleton UI.
// Return Statement
// javascript
// Copy code
// return (
// 	<>
// 		<div className='flex gap-3 items-center'>
// 			<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
// 			<div className='flex flex-col gap-1'>
// 				<div className='skeleton h-4 w-40'></div>
// 				<div className='skeleton h-4 w-40'></div>
// 			</div>
// 		</div>
// 		<div className='flex gap-3 items-center justify-end'>
// 			<div className='flex flex-col gap-1'>
// 				<div className='skeleton h-4 w-40'></div>
// 			</div>
// 			<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
// 		</div>
// 	</>
// );
// Outer Fragment <> </>
// A React fragment that groups the elements without adding extra DOM nodes.
// First Skeleton Message
// javascript
// Copy code
// <div className='flex gap-3 items-center'>
// flex: Makes the container a flexbox, enabling alignment of child elements in a row.
// gap-3: Adds spacing of 3 units between child elements.
// items-center: Vertically centers child elements within the flex container.
// javascript
// Copy code
// <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
// skeleton: A class likely applying a background color, gradient, or animation for the skeleton effect.
// w-10 h-10: Sets the width and height to 10 units (probably 40px, depending on the design system).
// rounded-full: Makes the div a circle to simulate a profile picture.
// shrink-0: Prevents the element from shrinking when the parent container's size is reduced.
// javascript
// Copy code
// <div className='flex flex-col gap-1'>
// flex: Makes the container a flexbox.
// flex-col: Aligns child elements vertically (column layout).
// gap-1: Adds a small vertical gap between child elements.
// javascript
// Copy code
// <div className='skeleton h-4 w-40'></div>
// <div className='skeleton h-4 w-40'></div>
// These two elements simulate text lines:
// skeleton: Adds the loading effect.
// h-4: Sets the height of each line to 4 units.
// w-40: Sets the width of each line to 40 units (likely 160px).
// Second Skeleton Message
// javascript
// Copy code
// <div className='flex gap-3 items-center justify-end'>
// flex: Enables a row layout.
// gap-3: Adds horizontal spacing between elements.
// items-center: Vertically centers child elements.
// justify-end: Aligns all child elements to the right of the container.
// javascript
// Copy code
// <div className='flex flex-col gap-1'>
// 	<div className='skeleton h-4 w-40'></div>
// </div>
// Represents a single text line aligned to the right:
// flex and flex-col: Creates a vertical layout (though here there's only one line).
// gap-1: Adds spacing between lines (useful if more lines are added later).
// h-4 w-40: Sets the dimensions of the line skeleton.
// javascript
// Copy code
// <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
// A circular skeleton element simulating a profile picture, aligned to the right of the text skeleton.
// Export Statement
// javascript
// Copy code
// export default MessageSkeleton;
// export default: Makes the MessageSkeleton component available for use in other parts of the application.
// Purpose
// The MessageSkeleton component is used:

// To mimic the structure of actual messages during the loading state.
// To maintain consistency in UI design even when data is not yet available.
// To enhance the user experience by visually indicating that content is loading.










