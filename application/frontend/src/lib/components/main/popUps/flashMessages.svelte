<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: flashMessages.svelte
*
* Description: Component for alert messages dictating 
* successful or error.
**************************************************************/ -->
<script>
  import { Alert } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { flashStore } from "../../../stores/flashStore.js";

  let messages = [];
  flashStore.subscribe((value) => (messages = value));
</script>

<div class="flash-container">
  {#each messages as message}
    {#if message.type === "error"}
      <Alert border color="red">
        <InfoCircleSolid slot="icon" class="w-5 h-5" />
        <span class="font-medium">{message.message}</span>
      </Alert>
    {:else if message.type === "success"}
      <Alert border color="green">
        <InfoCircleSolid slot="icon" class="w-5 h-5" />
        <span class="font-medium">{message.message}</span>
      </Alert>
    {/if}
  {/each}
</div>

<style>
  .flash-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
</style>
