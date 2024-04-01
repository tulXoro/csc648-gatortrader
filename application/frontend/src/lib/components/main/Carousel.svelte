<!-- <script>
  import { Carousel } from "flowbite-svelte";
  import { onMount } from "svelte";

  // Define a writable store to hold the fetched image data
  import { writable } from "svelte/store";
  const images = writable([]);

  // Function to fetch image data from the backend
  async function fetchImageData() {
    try {
      const response = await fetch("/getPosts");
      if (response.ok) {
        const data = await response.json();
        // Update the images store with fetched data
        images.set(data);
      } else {
        console.error("Failed to fetch image data");
      }
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  }

  // Call fetchImageData function when the component mounts
  onMount(fetchImageData);
</script>

<div class="max-w-4xl space-y-4">
  <Carousel
    let:Indicators
    let:Controls
    class="rounded-md ring-4 ring-green-500 border-4 border-white dark:border-gray-800 min-h-[320px] bg-gray-200"
  >
    {#each $posts as recentPosts}
      <img
        src={image.url}
        alt={image.alt}
        class="object-contain h-full w-fit rounded-sm"
      />
    {/each}
    <Indicators class="border border-white rounded-md p-2" />
    <Controls class="items-center text-red-400 dark:text-green-400 pt-4" />
  </Carousel>
</div> -->
