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

// Function to check if at least one of the names is filled in
export function checkNameFields(firstName, lastName) {
  return !!firstName.trim() && !!lastName.trim();
}

// Function to validate email format
export function validateEmail(email) {
  if (!email.trim()) return false; // if empty
  return email.trim().toLowerCase().endsWith("@sfsu.edu");
}

// Function to validate confirm password
export function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

// Function to check if all required fields are filled in except first name or last name
export function checkRequiredFields(username, email, password) {
  const requiredInputs = [username, email, password];
  return requiredInputs.every((input) => !!input.trim());
}
