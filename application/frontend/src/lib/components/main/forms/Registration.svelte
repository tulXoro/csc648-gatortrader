<script lang="ts">
  // Import Svelte components
  import {
    Input,
    Label,
    Button,
    Checkbox,
    A,
    ButtonGroup,
    InputAddon,
    P,
  } from "flowbite-svelte";
  import { Popover } from "flowbite-svelte";
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

  // Function to check if at least one of the names is filled in
  function checkNameFields() {
    return !!firstName.trim() && !!lastName.trim();
  }

  // Function to validate email format
  function validateEmail() {
    if (!email.trim()) return false; // if empty
    return email.trim().toLowerCase().endsWith("@sfsu.edu");
  }

  // Function to check password criteria
  function checkPasswordCriteria() {
    criteria.length = password.length >= 8;
    criteria.number = /\d/.test(password);
    criteria.uppercase = /[A-Z]/.test(password);
    criteria.lowercase = /[a-z]/.test(password);
    criteria.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  // Function to validate confirm password
  function validateConfirmPassword() {
    return password === confirmPassword;
  }

  // Function to check if all required fields are filled in except first name or last name
  function checkRequiredFields() {
    const requiredInputs = [username, email, password];
    return requiredInputs.every((input) => !!input.trim()) && checkNameFields();
  }

  // Function to handle form submission
  function handleSubmit() {
    if (!checkRequiredFields()) {
      alert("Please fill in all required fields.");
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
    console.log("Form submitted successfully!");
  }
</script>

<form method="POST" action="?/create" on:submit|preventDefault>
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
