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
  import { Carousel, Indicator } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { posts } from "../../../stores/store.js";

  // filter post by status and timestamp
  $: images = $posts
    .filter((post) => post.status === "APPROVED")
    .sort((a, b) => {
      const timestampA = new Date(a.timestamp).getTime();
      const timestampB = new Date(b.timestamp).getTime();
      return timestampB - timestampA; // Sort by timestamp descending
    })
    .map((post) => ({
      alt: post.item_name,
      src: `/image/${post.image_file}`,
      timestamp: post.timestamp,
    }));

  // Fetch posts
  onMount(async () => {
    try {
      const response = await fetch(
        "/getPosts?status=APPROVED&sortBy=timestamp:desc"
      );
      if (response.ok) {
        const data = await response.json();
        posts.set(data);
      } else {
        console.error("Failed to fetch approved posts");
      }
    } catch (error) {
      console.error("Error fetching approved posts:", error);
    }
  });
</script>

<div class="max-w-4xl space-y-4">
  <Carousel
    {images}
    imgClass="object-contain h-full w-fit rounded-sm"
    let:Indicators
    let:Controls
    class="rounded-md ring-4 ring-green-500 border-4 border-white dark:border-gray-800 min-h-[320px] bg-gray-200"
  >
    <Indicators class="border border-white rounded-md p-2" />
    <Controls class="items-center text-red-400 dark:text-green-400 pt-4" />
  </Carousel>
</div>