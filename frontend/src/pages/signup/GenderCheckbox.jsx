const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
					<span className='label-text'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
					<span className='label-text'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;








// Your GenderCheckbox component is almost complete, but it could be improved for better functionality and clarity. Here are a few suggestions:

// Checkbox Logic: The current implementation uses checkboxes, but typically gender selection is done with a radio button (one selection only). If you are looking for a single choice (male or female), radio buttons would be a more semantically correct option.

// Dynamic Class Handling: You can remove the selected class conditionally and apply styles based on the selected gender.

// Improvement in onCheckboxChange Handling: Ensure that the onCheckboxChange function is only called once per gender choice (if it's a checkbox, both can be checked).

// Here’s an improved version using radio buttons for gender selection:

// javascript
// Copy code
// const GenderRadioButton = ({ onGenderChange, selectedGender }) => {
//   return (
//     <div className='flex'>
//       <div className='form-control'>
//         <label
//           className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}
//         >
//           <span className='label-text'>Male</span>
//           <input
//             type='radio'
//             name='gender'
//             value='male'
//             className='radio border-slate-900'
//             checked={selectedGender === "male"}
//             onChange={() => onGenderChange("male")}
//           />
//         </label>
//       </div>
//       <div className='form-control'>
//         <label
//           className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}
//         >
//           <span className='label-text'>Female</span>
//           <input
//             type='radio'
//             name='gender'
//             value='female'
//             className='radio border-slate-900'
//             checked={selectedGender === "female"}
//             onChange={() => onGenderChange("female")}
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default GenderRadioButton;
// Key Changes:
// Radio Buttons: Changed from checkboxes to radio buttons to allow only one gender to be selected.
// Class Toggle: Added conditional classes for styling based on the selected gender.
// Form Control: Properly grouped input elements under form-control for better structure.
// This version now enforces the behavior where the user can select only one gender, making it more intuitive for forms.







