<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: SignUpProp.svelte
*
* Description: Sign up pop-up component for user registration.
**************************************************************/ -->
<script>
  import {
    Button,
    Modal,
    Label,
    Input,
    P,
    ButtonGroup,
    InputAddon,
  } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let formModal = false;
  let password = "";
  let username = "";
  let showPW = false;
  let isLoggedIn = false;

  async function handleLogin() {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Redirect to dashboard after successful login
        goto("/dashboard");
      } else {
        // Display error message from backend
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  }
  onMount(async () => {
    try {
      const response = await fetch("/login/status");
      const data = await response.json();
      isLoggedIn = data.isLoggedIn;
    } catch (error) {
      console.error("Failed to fetch login status:", error);
    }
  });
</script>

<Button
  on:click={() => (formModal = true)}
  class="w-full text-lg mb-3"
  style="background-color:steelblue; color: white;">Submit</Button
>

<Modal bind:open={formModal} size="xs" autoclose={false}>
  <div class="justify-center">
    <P align="center" size="3xl" height="loose" weight="semibold" class="mb-6"
      >Sign In</P
    >
    <div class="mb-6 text-left">
      <Label for="username" class="mb-2">Username</Label>
      <Input id="username" bind:value={username} required />
    </div>

    <div class="mb-6 text-left">
      <Label for="password" class="mb-2">Password</Label>
      <ButtonGroup class="w-full">
        <Input
          id="password"
          type={showPW ? "text" : "password"}
          placeholder="••••••••"
          bind:value={password}
        />
        <Button on:click={() => (showPW = !showPW)} class="p-0 bg-transparent">
          {#if showPW}
            <EyeOutline class="w-5 h-5 eye-icon" />
          {:else}
            <EyeSlashOutline class="w-5 h-5" />
          {/if}
        </Button>
      </ButtonGroup>
      <div class="mb-3 text-right">
        <p
          class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </p>
      </div>
    </div>

    <div>
      <Button
        type="submit"
        class="w-full"
        style="background-color:steelblue; color: white;"
        on:click={handleLogin}>Login</Button
      >
      <div
        class="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3 mt-3"
      >
        Not registered? <a
          href="/registration"
          class="text-primary-700 hover:underline dark:text-primary-500"
          >Create account</a
        >
      </div>
    </div>
  </div>
</Modal>
