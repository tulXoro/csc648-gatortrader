<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: about/+page.svelte
*
* Description: Component to display members of the team 
* consisting of thier bios
**************************************************************/ -->

<script>
  import { Card } from "flowbite-svelte";

  let teamMembers = [
    {
      slug: "tim",
      name: "Tim Lor",
      position: "Project Manager",
      img: "/path/to/image",
    },
    {
      slug: "luis",
      name: "Luis Angeles",
      position: "Front End Lead Developer",
      img: "/path/to/image",
    },
    {
      slug: "jayden",
      name: "Jayden Wong",
      position: "Back End Lead Developer",
      img: "/path/to/image",
    },
    {
      slug: "Singh",
      name: "Parampal Singh",
      position: "GitHub Master",
      img: "/path/to/image",
    },
    {
      slug: "cole",
      name: "Cole Douglas",
      position: "Front End Developer",
      img: "/path/to/image",
    },
    {
      slug: "Haley",
      name: "Haley Park",
      position: "Back End Developer",
      img: "/path/to/image",
    },
  ];
</script>

<title>GatorTrader | About Us</title>

<div
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center"
>
  {#each teamMembers as { name, position, img, slug }, i}
    <Card {img} class="team-member-card">
      <a href={`./about/${slug}`} class="no-underline">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline"
        >
          {name}
        </h5>
      </a>
      <p class="font-normal text-gray-700 dark:text-gray-400">{position}</p>
    </Card>
  {/each}
</div>
