<script>
  import default_profile from "$lib/assets/default_profile.jpg";
  import { Avatar } from "flowbite-svelte";
  import Footer from "$lib/components/main/Footer.svelte";
  import Nav from "$lib/components/main/Nav.svelte";
  import SideBar from "$lib/components/main/SideBar.svelte";

  export let name = "";
  export let photo = default_profile;
  export let bio = "";
  export let role = "";
  export let github = "";
  export let linkedin = "";
  export let email = "";
</script>

<Nav />
<SideBar />
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
