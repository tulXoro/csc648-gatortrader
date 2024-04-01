<script>
  import { Card, Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // Define a writable store for products
  const posts = writable([]);

  // Function to fetch product data from backend
  async function fetchProductData() {
    try {
      const response = await fetch("/getPosts");
      if (response.ok) {
        const data = await response.json();
        // Update the posts store with fetched data to make it accessible for rendering
        posts.set(data);
      } else {
        console.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  // Call fetchProductData function when the component mounts
  onMount(fetchProductData);
</script>

<!-- This will be used in future for product post page -->
<!-- <div on:click={() => navigateToSomePage()} class="grid grid-cols-5 gap-4"> -->
<div class="grid grid-cols-5 gap-4">
  {#each $posts.filter((post) => post.status === "APPROVED") as product}
    <Card class="col-span-1">
      <div class="relative h-full flex flex-col">
        <img
          class="object-cover w-full h-64"
          src={`/image/${product.image_file}`}
          alt={product.item_name}
        />
        <div class="p-4 flex-grow flex flex-col justify-end bg-white">
          <h5 class="mb-2 text-xl font-bold">{product.item_name}</h5>
          <p class="mb-2 text-sm">${product.price}</p>
          <Button class="text-sm mt-auto">Message</Button>
        </div>
      </div>
    </Card>
  {/each}
</div>
