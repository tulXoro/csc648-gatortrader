<script lang="ts">
  import { goto } from "$app/navigation";
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
  async function handleSubmit() {
    console.log("Form Data:", {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      checkboxChecked,
    });
    if (!checkRequiredFields()) {
      alert("Please fill in all required fields.");
      return;
    }
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

    try {
      const response = await fetch("/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
          lastName: lastName,
          firstName: firstName,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Redirect to dashboard after successful registration
      goto("/dashboard");

      const responseData = await response.json();
      alert(responseData.message);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was an error registering the user. Please try again later.");
    }
  }
</script>

<form method="POST" action="?/create" on:submit|preventDefault>
  <div
    class="mb-10 border border-gray-300 rounded-lg shadow-md w-1/2 mx-auto py-8 sm:px-6 lg:px-8"
  >
    <div class="mb-6">
      <P align="center" size="4xl" height="loose" weight="semibold">Sign up</P>
    </div>
    <div class="grid gap-6 md:grid-cols-2">
      <div class="mb-6">
        <Label for="firstName" class="mb-2 flex text-xl"
          >First name
          <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
        </Label>
        <Input type="text" id="firstName" bind:value={firstName} required />
      </div>
      <div class="mb-6">
        <Label for="lastName" class="mb-2 flex text-xl"
          >Last name
          <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
        </Label>
        <Input type="text" id="lastName" bind:value={lastName} required />
      </div>
    </div>
    <div class="mb-6">
      <Label for="username" class="mb-2 flex text-xl"
        >Username
        <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
      </Label>
      <Input type="text" id="username" bind:value={username} required />
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2 flex text-xl"
        >Email
        <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
      </Label>
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
      <Label for="password" class="mb-2 flex text-xl"
        >Password
        <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
      </Label>
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
      <Label for="confirmPassword" class="mb-2 flex text-xl"
        >Confirm password
        <!-- <p class="text-gray-500 italic text-sm">* Required</p> -->
      </Label>
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
    <Button
      class="w-full text-xl"
      type="button"
      style="background-color:steelblue; color: white;"
      on:click={handleSubmit}>Submit</Button
    >
  </div>
</form>
