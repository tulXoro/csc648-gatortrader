<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Notification.svelte
*
* Description: Component for a Notifcation popUp. Will be  
* notifications for messages from buyers to sellers.
**************************************************************/ -->
<script>
    import { Alert, Button } from 'flowbite-svelte';
    import { InfoCircleSolid } from 'flowbite-svelte-icons';
    import { fly } from 'svelte/transition';
  </script>
  
  <!-- <Alert dismissable>
    <InfoCircleSolid slot="icon" class="w-5 h-5" />
    A simple default alert with an
    <a href="/" class="font-semibold underline hover:text-blue-800 dark:hover:text-blue-900">example link</a>
    . Give it a click if you like.
  </Alert> -->
  <Alert color="blue" dismissable>
    <InfoCircleSolid slot="icon" class="w-5 h-5" />
    A simple info alert with an
    <a href="/" class="font-semibold underline hover:text-blue-800 dark:hover:text-blue-900">example link</a>
    . Give it a click if you like.
  </Alert>
  <!-- <Alert color="red" dismissable>
    <InfoCircleSolid slot="icon" class="w-5 h-5" />
    A simple info alert with an
    <a href="/" class="font-semibold underline hover:text-red-800 dark:hover:text-red-900">example link</a>
    . Give it a click if you like.
  </Alert>
  <Alert color="green" dismissable>
    <InfoCircleSolid slot="icon" class="w-5 h-5" />
    A simple info alert with an
    <a href="/" class="font-semibold underline hover:text-green-800 dark:hover:text-green-900">example link</a>
    . Give it a click if you like.
  </Alert>
  <Alert color="yellow" dismissable transition={fly} params={{ x: 200 }}>
    <InfoCircleSolid slot="icon" class="w-5 h-5" />
    An alert with non default animation - fly away.
  </Alert> -->