<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Profile.svelte
*
* Description: Page route to display detailed information
* of a team member.
**************************************************************/ -->

<script>
  import default_profile from "$lib/assets/default_profile.jpg";
  import { Avatar, Button, ButtonGroup } from "flowbite-svelte";
  import Footer from "$lib/components/main/layout/Footer.svelte";
  import Nav from "$lib/components/main/layout/Nav.svelte";
  import Header from "$lib/components/main/layout/Header.svelte";

  export let name = "";
  export let photo = default_profile;
  export let bio = "";
  export let role = "";
  export let github = "";
  export let linkedin = "";
  export let email = "";

  // Reactive statement to set the page title
  $: document.title = `GatorTrader | About Us - ${name}`;
</script>

<!-- <Header />
<Nav /> -->
<main>
  <div
    class="bg-white dark:bg-gray-800 text-black-500 dark:text-gray-400 rounded-lg
       border border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 shadow-md flex justify-center items-center"
    style="padding:10px; text-align:center "
  >
    <div class="flex flex-wrap justify-center items-center gap-8">
      <div class="w-full md:w-1/2 flex justify-center">
        <Avatar src={photo} alt={name} rounded class="w-48 h-48" />
      </div>
      <div class="w-full md:w-1/2">
        <h2 class="text-3xl font-semibold mb-3">{name}</h2>
        <h3 class="text-xl mb-3">{role}</h3>
        <p class="mb-6">{bio}</p>
        <div class="space-x-4">
          <ButtonGroup>
            {#if github}
              <Button
                outline
                color="dark"
                href={github}
                target="_blank"
                rel="noopener noreferrer">GitHub</Button
              >
            {/if}
            {#if linkedin}
              <Button
                outline
                color="dark"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer">LinkedIn</Button
              >
            {/if}
            {#if email}
              <Button
                outline
                color="dark"
                href={"mailto:" + email}
                target="_blank"
                rel="noopener noreferrer">Email</Button
              >
            {/if}
          </ButtonGroup>
        </div>
      </div>
    </div>
  </div>
</main>
<!-- <Footer /> -->
