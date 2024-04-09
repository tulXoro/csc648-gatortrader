<script>
  import {
    Input,
    Label,
    Button,
    Checkbox,
    A,
    ButtonGroup,
    InputAddon,
    ToolbarButton,
  } from "flowbite-svelte";
  import { Popover } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";

  // email criteria
  let email = "";
  function validateEmail() {
    if (!email.trim()) return false; // if empty
    return email.trim().toLowerCase().endsWith("@sfsu.edu");
  }

  // Function to handle form submission
  function handleSubmit() {
    checkPasswordCriteria(); // Check password criteria
    if (!validateEmail()) {
      alert("Please enter a valid email ending with '@sfsu.edu'.");
    } else if (!Object.values(criteria).every((c) => c === true)) {
      alert("Please make sure your password meets all criteria.");
    } else {
      // Proceed with form submission
      console.log("Email and password are valid:", email, password);
      // Add your form submission logic here
    }
  }

  // show password
  let showPW = false;

  // password criteria
  let password = "";
  let criteria = {
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  };

  // real-time validator
  function checkPasswordCriteria() {
    criteria.length = password.length >= 8;
    criteria.number = /\d/.test(password);
    criteria.uppercase = /[A-Z]/.test(password);
    criteria.lowercase = /[a-z]/.test(password);
    criteria.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
</script>

<form method="POST" action="?/create">
  <div class="form-container">
    <div class="mb-6">
      <Label for="username" class="mb-2">Username</Label>
      <Input type="text" id="first_name" placeholder="John" required />
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email</Label>
      <Input
        type="email"
        id="email"
        placeholder="@sfsu.edu"
        bind:value={email}
        required
      />
    </div>

    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <ButtonGroup class="w-full flex justify-between">
        <Input
          id="password"
          type={showPW ? "text" : "password"}
          placeholder="••••••••"
          bind:value={password}
          on:input={checkPasswordCriteria}
        />
        <InputAddon>
          <Button on:click={() => (showPW = !showPW)}>
            {#if showPW}
              <EyeOutline class="w-5 h-5 eye-icon" />
            {:else}
              <EyeSlashOutline class="w-5 h-5" />
            {/if}
          </Button>
        </InputAddon>
      </ButtonGroup>
    </div>

    <Popover class="text-sm" triggeredBy="#password" placement="bottom">
      <div class="grid grid-cols-1 gap-2">
        <div class="flex items-center">
          <div
            class="{criteria.length
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-3 w-3 flex items-center justify-center"
          >
            {criteria.length ? "✓" : ""}
          </div>
          <span class="ml-2"> Must have at least 8 characters </span>
        </div>
        <div class="flex items-center">
          <div
            class="{criteria.number
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-3 w-3 flex items-center justify-center"
          >
            {criteria.number ? "✓" : ""}
          </div>
          <span class="ml-2"> Have one number </span>
        </div>
        <div class="flex items-center">
          <div
            class="{criteria.uppercase
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-3 w-3 flex items-center justify-center"
          >
            {criteria.uppercase ? "✓" : ""}
          </div>
          <span class="ml-2"> Have one uppercase character </span>
        </div>

        <div class="flex items-center">
          <div
            class="{criteria.lowercase
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-3 w-3 flex items-center justify-center"
          >
            {criteria.lowercase ? "✓" : ""}
          </div>
          <span class="ml-2"> Have one lowercase character </span>
        </div>

        <div class="flex items-center">
          <div
            class="{criteria.specialChar
              ? 'bg-green-400'
              : 'bg-gray-200 dark:bg-gray-600'} rounded-full h-3 w-3 flex items-center justify-center"
          >
            {criteria.specialChar ? "✓" : ""}
          </div>
          <span class="ml-2"> Have one special character </span>
        </div>
      </div>
    </Popover>

    <Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
      I agree with the<A
        href="#"
        class="text-primary-700 dark:text-primary-600 hover:underline"
        >terms and conditions</A
      >.
    </Checkbox>
    <div class="flex justify-center">
      <Button class="" type="button" on:click={handleSubmit}>Submit</Button>
    </div>
  </div>
</form>

<style>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
