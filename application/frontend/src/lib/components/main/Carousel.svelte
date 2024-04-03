<script>
  import { Carousel, Indicator } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { posts } from "../../store.js";

  // Fetch approved posts from the store and map them to image objects
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
      timestamp: post.timestamp, // Include the timestamp in the image object
    }));

  // Fetch posts from the server when the component mounts
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
