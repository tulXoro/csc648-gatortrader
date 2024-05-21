<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Carousel.svelte
*
* Description: Component to display recent posts based on
* Status (APPROVED) and Timestamp (LASTEST).
**************************************************************/ -->

<script>
  import { onMount } from "svelte";
  import { Button, Heading, P, Span } from "flowbite-svelte";
  // import { posts } from "../../../stores/store.js";
  import { CaretLeftSolid, CaretRightSolid } from "flowbite-svelte-icons";
  import ProductPost from "./ProductPost.svelte";
  import Post from "../forms/Post.svelte";

  let posts = [];
  let currentIndex = 0;
  const itemsPerPage = 5;

  // Function to sort posts by timestamp
  function sortPostsByTimestamp() {
    posts.sort((a, b) => {
      const timestampA = new Date(a.timestamp).getTime();
      const timestampB = new Date(b.timestamp).getTime();
      return timestampB - timestampA; // Sort by timestamp descending
    });
  }

  // scroll buttons
  function handleNext() {
    currentIndex = Math.min(
      currentIndex + itemsPerPage,
      posts.length - itemsPerPage
    );
  }

  function handlePrev() {
    currentIndex = Math.max(currentIndex - itemsPerPage, 0);
  }

  onMount(() => {
    const params = new URLSearchParams({
      limit: "10",
      page: "1",
    });

    fetch(`/posts?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        posts = data;
        sortPostsByTimestamp();
        // posts = data.sort((a, b) => {
        //   const timestampA = new Date(a.timestamp).getTime();
        //   const timestampB = new Date(b.timestamp).getTime();
        //   return timestampB - timestampA;
        // });
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      });
  });
</script>

<Heading tag="h1" class="mb-5" align="center">
  The marketplace for <Span highlight>SFSU</Span>. Buy and sell locally.
</Heading>

<div class="bg-slate-700 p-5 mb-10 border border-gray-300 rounded-lg shadow-md">
  <p class="text-white font-bold text-2xl">Recent Posts</p>
  <div
    class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 relative overflow-hidden"
  >
    {#each posts.slice(currentIndex, currentIndex + itemsPerPage) as post}
      <ProductPost {post} />
    {/each}

    <Button
      on:click={handlePrev}
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-500/25 px-4 py-64 rounded-lg"
      style="background-color: slate; color: white; border: none;"
    >
      <CaretLeftSolid class="w-4 h-8" />
    </Button>

    <Button
      on:click={handleNext}
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-500/25 px-4 py-64 rounded-lg"
      style="background-color: slate; color: white; border: none;"
    >
      <CaretRightSolid class="w-4 h-8" />
    </Button>
  </div>
</div>
