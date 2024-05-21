<<<<<<< HEAD
<script lang="ts">
  // Import Svelte components
=======
<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Registration.svelte
*
* Description: Registration form component for user sign up and sign in.
**************************************************************/ -->
<script lang="ts">
  import { goto } from "$app/navigation";
>>>>>>> origin/horizontalPrototype
  import {
    Input,
    Label,
    Button,
    Checkbox,
    A,
    ButtonGroup,
    InputAddon,
    P,
<<<<<<< HEAD
  } from "flowbite-svelte";
  import { Popover } from "flowbite-svelte";
=======
    Popover,
  } from "flowbite-svelte";
>>>>>>> origin/horizontalPrototype
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";

  let firstName = "";
  let lastName = "";
  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let showPW = false;
  let checkboxChecked = false;
  let criteria = {
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  };

<<<<<<< HEAD
  // Function to check if at least one of the names is filled in
=======
  let isSignUp = true;

  function toggleMode() {
    isSignUp = !isSignUp;
  }

>>>>>>> origin/horizontalPrototype
  function checkNameFields() {
    return !!firstName.trim() && !!lastName.trim();
  }

<<<<<<< HEAD
  // Function to validate email format
  function validateEmail() {
    if (!email.trim()) return false; // if empty
    return email.trim().toLowerCase().endsWith("@sfsu.edu");
  }

  // Function to check password criteria
=======
  function validateEmail() {
    if (!email.trim()) return false;
    return email.trim().toLowerCase().endsWith("@sfsu.edu");
  }

>>>>>>> origin/horizontalPrototype
  function checkPasswordCriteria() {
    criteria.length = password.length >= 8;
    criteria.number = /\d/.test(password);
    criteria.uppercase = /[A-Z]/.test(password);
    criteria.lowercase = /[a-z]/.test(password);
    criteria.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

<<<<<<< HEAD
  // Function to validate confirm password
=======
>>>>>>> origin/horizontalPrototype
  function validateConfirmPassword() {
    return password === confirmPassword;
  }

<<<<<<< HEAD
  // Function to check if all required fields are filled in except first name or last name
  function checkRequiredFields() {
    const requiredInputs = [username, email, password];
    return requiredInputs.every((input) => !!input.trim()) && checkNameFields();
  }

  // Function to handle form submission
  function handleSubmit() {
=======
  function checkRequiredFields() {
    const requiredInputs = isSignUp
      ? [username, email, password]
      : [username, password];
    return (
      requiredInputs.every((input) => !!input.trim()) &&
      (!isSignUp || checkNameFields())
    );
  }

  async function handleSubmit() {
>>>>>>> origin/horizontalPrototype
    if (!checkRequiredFields()) {
      alert("Please fill in all required fields.");
      return;
    }
<<<<<<< HEAD
    if (!validateEmail()) {
      alert("Please enter a valid email address ending with @sfsu.edu.");
      return;
    }
    if (!validateConfirmPassword()) {
      alert("Passwords do not match.");
      return;
    }
    if (!checkboxChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    if (!Object.values(criteria).every((value) => value)) {
      alert("Password does not meet all criteria.");
      return;
    }
    console.log("Form submitted successfully!");
=======
    if (isSignUp) {
      if (!checkNameFields()) {
        alert("Please enter your first and last name.");
        return;
      }
      if (!validateEmail()) {
        alert("Please enter a valid email address ending with @sfsu.edu.");
        return;
      }
      if (!validateConfirmPassword()) {
        alert("Passwords do not match.");
        return;
      }
      if (!checkboxChecked) {
        alert("Please agree to the terms and conditions.");
        return;
      }
      if (!Object.values(criteria).every((value) => value)) {
        alert("Password does not meet all criteria.");
        return;
      }
    }

    const endpoint = isSignUp ? "/registerUser" : "/login";
    const payload = isSignUp
      ? {
          userName: username,
          password: password,
          lastName: lastName,
          firstName: firstName,
          email: email,
        }
      : { userName: username, password: password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      // Check if the response contains user authentication data
      if (responseData.user && responseData.token) {
        // Store user data and token in session storage or cookies
        sessionStorage.setItem("userData", JSON.stringify(responseData.user));
        sessionStorage.setItem("token", responseData.token);
      }

      // if successful, redirect to dashboard
      goto("/dashboard");

      alert(responseData.message);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was an error. Please try again later.");
    }
>>>>>>> origin/horizontalPrototype
  }
</script>

<form method="POST" action="?/create" on:submit|preventDefault>
<<<<<<< HEAD
  <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-6">
      <P align="center" size="3xl" height="loose" weight="semibold">Sign up</P>
    </div>
    <div class="grid gap-6 md:grid-cols-2">
      <div class="mb-6">
        <Label for="firstName" class="mb-2">First name</Label>
        <Input type="text" id="firstName" bind:value={firstName} required />
      </div>
      <div class="mb-6">
        <Label for="lastName" class="mb-2">Last name</Label>
        <Input type="text" id="lastName" bind:value={lastName} required />
      </div>
    </div>
    <div class="mb-6">
      <Label for="username" class="mb-2">Username</Label>
      <Input type="text" id="username" bind:value={username} required />
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email</Label>
      <Input
        type="email"
        id="email"
        placeholder="domain@sfsu.edu"
        bind:value={email}
        on:input={validateEmail}
        required
      />
    </div>

    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
=======
  <div
    class="mb-10 border border-gray-300 rounded-lg shadow-md w-1/2 mx-auto py-8 sm:px-6 lg:px-8"
  >
    <div class="mb-6">
      <P align="center" size="4xl" height="loose" weight="semibold"
        >{isSignUp ? "Sign Up" : "Sign In"}</P
      >
    </div>

    {#if isSignUp}
      <div class="grid gap-6 md:grid-cols-2">
        <div class="mb-6">
          <Label for="firstName" class="mb-2 flex text-xl">First name</Label>
          <Input type="text" id="firstName" bind:value={firstName} required />
        </div>
        <div class="mb-6">
          <Label for="lastName" class="mb-2 flex text-xl">Last name</Label>
          <Input type="text" id="lastName" bind:value={lastName} required />
        </div>
      </div>
    {/if}

    <div class="mb-6">
      <Label for="username" class="mb-2 flex text-xl">Username</Label>
      <Input type="text" id="username" bind:value={username} required />
    </div>

    {#if isSignUp}
      <div class="mb-6">
        <Label for="email" class="mb-2 flex text-xl">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="domain@sfsu.edu"
          bind:value={email}
          on:input={validateEmail}
          required
        />
      </div>
    {/if}

    <div class="mb-6">
      <Label for="password" class="mb-2 flex text-xl">Password</Label>
>>>>>>> origin/horizontalPrototype
      <ButtonGroup class="w-full">
        <Input
          id="password"
          type={showPW ? "text" : "password"}
          placeholder="••••••••"
          bind:value={password}
          on:input={checkPasswordCriteria}
        />
        <InputAddon>
          <Button
            class="p-0 bg-transparent"
            on:click={() => (showPW = !showPW)}
          >
            {#if showPW}
              <EyeOutline class="w-5 h-5 eye-icon" />
            {:else}
              <EyeSlashOutline class="w-5 h-5" />
            {/if}
          </Button>
        </InputAddon>
      </ButtonGroup>
    </div>
<<<<<<< HEAD
    <div class="mb-6">
      <Label for="confirmPassword" class="mb-2">Confirm password</Label>
      <Input
        id="confirmPassword"
        type={showPW ? "text" : "password"}
        placeholder="••••••••"
        bind:value={confirmPassword}
        on:input={validateConfirmPassword}
      />
    </div>

    <Popover class="text-sm" triggeredBy="#password" placement="left">
      <div class="grid grid-cols-1 gap-2">
        <div class="flex items-center">
          <div
            class="{criteria.length
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
          >
            {criteria.length ? "✓" : ""}
          </div>
          <span class="ml-2"> Must have at least 8 characters </span>
        </div>
        <div class="flex items-center">
          <div
            class="{criteria.number
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
          >
            {criteria.number ? "✓" : ""}
          </div>
          <span class="ml-2"> Have one number </span>
        </div>
        <div class="flex items-center">
          <div
            class="{criteria.uppercase
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
          >
            {criteria.uppercase ? "✓" : ""}
          </div>
          <span class="ml-2"> Have one uppercase character </span>
        </div>

        <div class="flex items-center">
          <div
            class="{criteria.lowercase
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
          >
            {criteria.lowercase ? "✓" : ""}
          </div>
          <span class="ml-2"> Have one lowercase character </span>
        </div>

        <div class="flex items-center">
          <div
            class="{criteria.specialChar
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
          >
            {criteria.specialChar ? "✓" : ""}
          </div>
          <span class="ml-2"> Have one special character </span>
        </div>
      </div>
    </Popover>

    <Checkbox class="flex justify-center" bind:checked={checkboxChecked}>
      I agree with the<A href="#">terms and conditions</A>
    </Checkbox>
    <Button class="w-full" type="button" on:click={handleSubmit}>Submit</Button>
  </div>
</form>

<style>
  .container {
    max-width: 600px;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
=======

    {#if isSignUp}
      <div class="mb-6">
        <Label for="confirmPassword" class="mb-2 flex text-xl"
          >Confirm password</Label
        >
        <Input
          id="confirmPassword"
          type={showPW ? "text" : "password"}
          placeholder="••••••••"
          bind:value={confirmPassword}
          on:input={validateConfirmPassword}
        />
      </div>

      <Popover class="text-sm" triggeredBy="#password" placement="left">
        <div class="grid grid-cols-1 gap-2">
          <div class="flex items-center">
            <div
              class="{criteria.length
                ? 'bg-green-400'
                : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
            >
              {criteria.length ? "✓" : ""}
            </div>
            <span class="ml-2"> Must have at least 8 characters </span>
          </div>
          <div class="flex items-center">
            <div
              class="{criteria.number
                ? 'bg-green-400'
                : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
            >
              {criteria.number ? "✓" : ""}
            </div>
            <span class="ml-2"> Have one number </span>
          </div>
          <div class="flex items-center">
            <div
              class="{criteria.uppercase
                ? 'bg-green-400'
                : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
            >
              {criteria.uppercase ? "✓" : ""}
            </div>
            <span class="ml-2"> Have one uppercase character </span>
          </div>
          <div class="flex items-center">
            <div
              class="{criteria.lowercase
                ? 'bg-green-400'
                : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
            >
              {criteria.lowercase ? "✓" : ""}
            </div>
            <span class="ml-2"> Have one lowercase character </span>
          </div>
          <div class="flex items-center">
            <div
              class="{criteria.specialChar
                ? 'bg-green-400'
                : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-4 w-4 flex items-center justify-center"
            >
              {criteria.specialChar ? "✓" : ""}
            </div>
            <span class="ml-2"> Have one special character </span>
          </div>
        </div>
      </Popover>

      <Checkbox
        class="flex justify-center text-lg mb-3"
        bind:checked={checkboxChecked}
      >
        I agree with the<A href="#" style=" color:slategray;"
          >terms and conditions</A
        >
      </Checkbox>
    {/if}

    <Button
      class="w-full text-xl"
      type="button"
      style="background-color:steelblue; color: white;"
      on:click={handleSubmit}
    >
      {isSignUp ? "Sign Up" : "Sign In"}
    </Button>

    <P class="text-center mt-4">
      {isSignUp ? "Already have an account?" : "Don't have an account?"}
      <A href="#" on:click={toggleMode} class="text-blue-500"
        >{isSignUp ? "Sign In" : "Sign Up"}</A
      >
    </P>
  </div>
</form>
>>>>>>> origin/horizontalPrototype
