<script>
  import { Button, Modal, Label, Input, P } from "flowbite-svelte";

  let formModal = false;

  // will use middleware to auth.js
  let password = "";
  let email = "";
</script>

<Button
  on:click={() => (formModal = true)}
  class="w-full text-lg mb-3"
  style="background-color:steelblue; color: white;">Submit</Button
>

<Modal bind:open={formModal} size="xs" autoclose={false}>
  <!-- Method is ? -->
  <div class="justify-center">
    <P align="center" size="3xl" height="loose" weight="semibold" class="mb-6"
      >Sign In</P
    >
    <div class="mb-6 text-left">
      <Label for="email" class="mb-2">Email</Label>
      <Input
        type="email"
        id="email"
        placeholder="domain@sfsu.edu"
        bind:value={email}
        required
      />
    </div>

    <div class="mb-6 text-left">
      <Label for="password" class="mb-2">Password</Label>
      <Input
        id="password"
        placeholder="••••••••"
        bind:value={password}
        required
      />
      <div class="mb-3 text-right">
        <a
          href="#"
          class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </a>
      </div>
    </div>
    <!-- Middleware IsLoggedIn  onClick:{} -->
    <div>
      <Button
        type="submit"
        class="w-full"
        style="background-color:steelblue; color: white;">Login</Button
      >
      <div
        class="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3 mt-3"
      >
        Not registered? <a
          href="/registration"
          class="text-primary-700 hover:underline dark:text-primary-500"
        >
          Create account
        </a>
      </div>
    </div>
  </div>
</Modal>
