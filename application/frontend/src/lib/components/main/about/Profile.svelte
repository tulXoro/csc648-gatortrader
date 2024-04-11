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
  import { Avatar } from "flowbite-svelte";
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
</script>

<Header />
<Nav />
<main>
  <div class="flex flex-wrap justify-center items-center gap-8">
    <div class="w-full md:w-1/2 flex justify-center">
      <Avatar src={photo} alt={name} rounded class="w-48 h-48" />
    </div>
    <div class="w-full md:w-1/2">
      <h2 class="text-3xl font-semibold mb-3">{name}</h2>
      <h3 class="text-xl mb-3">{role}</h3>
      <p class="mb-6">{bio}</p>
      <div class="space-x-4">
        {#if github}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline">GitHub</a
          >
        {/if}
        {#if linkedin}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline">LinkedIn</a
          >
        {/if}
        {#if email}
          <a
            href={"mailto:" + email}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline">Email</a
          >
        {/if}
      </div>
    </div>
  </div>
</main>
<Footer />
