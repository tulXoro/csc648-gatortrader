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
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { flashStore } from "$lib/stores/flashStore";
  import {
    Input,
    Label,
    Button,
    Checkbox,
    A,
    ButtonGroup,
    InputAddon,
    P,
    Popover,
  } from "flowbite-svelte";
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

  let isSignUp = true;

  onMount(() => {
    // Check if the user is already logged in
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      goto("/dashboard");
    }
  });

  function toggleMode() {
    isSignUp = !isSignUp;
  }

  function checkNameFields() {
    return !!firstName.trim() && !!lastName.trim();
  }

  function validateEmail() {
    if (!email.trim()) return false;
    return email.trim().toLowerCase().endsWith("@sfsu.edu");
  }

  function checkPasswordCriteria() {
    criteria.length = password.length >= 8;
    criteria.number = /\d/.test(password);
    criteria.uppercase = /[A-Z]/.test(password);
    criteria.lowercase = /[a-z]/.test(password);
    criteria.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  function validateConfirmPassword() {
    return password === confirmPassword;
  }

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
    if (!checkRequiredFields()) {
      triggerError("Please fill in all required fields.");
      return;
    }
    if (isSignUp) {
      if (!checkNameFields()) {
        triggerError("Please enter your first and last name.");
        return;
      }
      if (!validateEmail()) {
        triggerError(
          "Please enter a valid email address ending with @sfsu.edu."
        );
        return;
      }
      if (!validateConfirmPassword()) {
        triggerError("Passwords do not match.");
        return;
      }
      if (!checkboxChecked) {
        triggerError("Please agree to the terms and conditions.");
        return;
      }
      if (!Object.values(criteria).every((value) => value)) {
        triggerError("Password does not meet all criteria.");
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

      if (isSignUp) {
        // If it's a sign-up operation, trigger success message for registration
        triggerSuccess("Registration successful!");
      } else {
        // If it's a login operation, trigger success message for login
        triggerSuccess("Login successful!");
      }
      goto("/dashboard");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      triggerError("Username or password does not match.");
    }
  }
  function triggerError(message: string) {
    flashStore.add(message, "error", 5000);
  }
  function triggerSuccess(message: string) {
    flashStore.add(message, "success", 5000);
  }
</script>

<form method="POST" action="?/create" on:submit|preventDefault>
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
