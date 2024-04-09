/**************************************************************
 * Class: CSC-648-03 Spring 2024
 * Team: 05
 * GitHub ID: csc648-sp24-03-team05
 * Project: SWE Final Project
 *
 * File: validation.js
 *
 * Description: Middleware to handle input fields, preventing
 * injections and leaks, providing functions to validate email
 * format, check password criteria, and handle form submission
 * alerts based on validation results.
 **************************************************************/

// email criteria
export let email = "";
export function validateEmail() {
  if (!email.trim()) return false; // if empty
  return email.trim().toLowerCase().endsWith("@sfsu.edu");
}

// Function to handle form submission
// will do API call soon
export function handleSubmit() {
  checkPasswordCriteria(); // Check password criteria
  const isValidEmail = validateEmail();
  const isValidPassword = Object.values(criteria).every((c) => c === true);

  if (!isValidEmail && !isValidPassword) {
    alert(
      "Please enter a valid email ending with '@sfsu.edu' and make sure your password meets all criteria."
    );
  } else if (!isValidEmail) {
    alert("Please enter a valid email ending with '@sfsu.edu'.");
  } else if (!isValidPassword) {
    alert("Please make sure your password meets all criteria.");
  } else {
    // Proceed with form submission
    console.log("Email and password are valid:", email, password);
    // Add your form submission logic here
  }
}

// show password
export let showPW = false;

// password criteria
export let password = "";
export let criteria = {
  length: false,
  number: false,
  uppercase: false,
  lowercase: false,
  specialChar: false,
};

// real-time validator
export function checkPasswordCriteria() {
  criteria.length = password.length >= 8;
  criteria.number = /\d/.test(password);
  criteria.uppercase = /[A-Z]/.test(password);
  criteria.lowercase = /[a-z]/.test(password);
  criteria.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
}
