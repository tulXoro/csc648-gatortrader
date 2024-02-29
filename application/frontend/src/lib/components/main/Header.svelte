<script>
  import { onMount } from "svelte";
  import { Heading } from "flowbite-svelte";

  let width = 0;

  onMount(() => {
    const el = document.querySelector(".ticker-text");
    // width = el.offsetWidth;
  });
</script>

<header class="w-full text-center py-4">
  <div class="ticker-container">
    <h2 class="ticker-text">
      SFSU Software Engineering Project CSC 648-848, Spring 2024. For
      Demonstration Only
    </h2>
  </div>
  <Heading tag="h1">CSC648 Project</Heading>
</header>

<style>
  @keyframes ticker {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }

  .ticker-container {
    overflow: hidden;
    white-space: nowrap;
  }

  .ticker-text {
    display: inline-block;
    padding-left: 100%;
    animation: ticker 50s linear infinite;
    font-weight: bold;
    background-color: rgb(188, 7, 7);
    color: white;
    padding: 5px 50px; /* Adjust padding as needed */
  }
</style>
