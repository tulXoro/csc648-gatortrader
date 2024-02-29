<!-- This this the about-us page  -->

<script>
  import Header from "$lib/components/main/Header.svelte";
  import Footer from "$lib/components/main/Footer.svelte";
  import { Heading } from "flowbite-svelte";
  // import Nav from "$lib/components/main/Nav.svelte"; will be added later
  import { Card, Button } from "flowbite-svelte";

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
    {
      slug: "Singh",
      name: "Parampal Singh",
      position: "GitHub Master",
      img: "/path/to/image",
    },
    {
      slug: "jayden",
      name: "Jayden Wong",
      position: "Back End Lead Developer",
      img: "/path/to/image",
    },
  ];
</script>

<Header />
<Heading tag="h3">Meet the Team</Heading>
<div class="team-container">
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
<Footer />

<style>
  .team-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    justify-items: center;
    align-items: center;
  }
</style>
