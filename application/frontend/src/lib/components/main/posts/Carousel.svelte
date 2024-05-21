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
  import { Card, Button, Heading, P, Span } from "flowbite-svelte";
  // import { posts } from "../../../stores/store.js";
  import { CaretLeftOutline, CaretRightOutline } from "flowbite-svelte-icons";
  import Message from "../popUps/Message.svelte";
  import Results from "./Results.svelte";

  // // Filter and sort posts
  // $: filteredPosts = $posts.sort((a, b) => {
  //   const timestampA = new Date(a.timestamp).getTime();
  //   const timestampB = new Date(b.timestamp).getTime();
  //   return timestampB - timestampA; // Sort by timestamp descending
  // });
  let posts = [];

  let currentIndex = 0;
  const itemsPerPage = 5;

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

  let isButtonClicked = false;

  function handleClick() {
    isButtonClicked = true;
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
  })
  .catch((err) => {
    console.error("Failed to fetch posts:", err);
  });
  });
</script>

<Heading tag="h1" class="mb-5" align="center">
  The marketplace for <Span highlight>SFSU</Span>. Buy and sell locally.
</Heading>

<div class="bg-gray-300 p-5 mb-10 border border-gray-300 rounded-lg shadow-md">
  <P align="left" weight="bold" size="2xl">Recent Posts</P>
  <Results />
  <div
    class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 relative overflow-hidden"
  >
    {#each posts.slice(currentIndex, currentIndex + itemsPerPage) as post}
      <Card padding="none">
        <a href={`/viewPost/${post.post_id}`}>
          <img
            class="object-cover w-full h-64"
            src={`/image/thumbnails/${post.image_file}`}
            alt={post.item_name}
          /></a
        >

        <div class="flex-grow flex flex-col justify-end bg-white">
          <p class="ml-2 mb-2 text-2xl font-black">{post.item_name}</p>
          <p class="mr-2 mb-2 text-3xl font-black" style="text-align: right;">
            ${post.price}
          </p>
          <Message {post} />
        </div>
      </Card>
    {/each}
  </div>
  <Button
    pill={true}
    on:click={handlePrev}
    class="absolute left-0 transform -translate-y-1/2 bg-red-300/50 "
    ><CaretLeftOutline class="w-4 h-4" /></Button
  >
  <Button
    pill={true}
    on:click={handleNext}
    class="absolute right-0 transform -translate-y-1/2 bg-red-300/50"
    ><CaretRightOutline class="w-4 h-4" /></Button
  >
</div>
