<script>
  import { Card, Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  // import { writable } from "svelte/store";
  // import selectedCategory from "./Nav.svelte";
  import { posts } from "../../store.js";

  // THIS FETCH IS NOT NEEDED...
  // COMMENTED OUT FOR FUTURE REFERENCE
  // MAY DELETE LATER - TIM
  // Fetches data from back with curr URL parameters
  // async function fetchProductData() {
  //   try {
  //     // Create a new URL object for the fetch request
  //     const url = new URL("/getPosts", window.location.origin);
  //     // Extract URL parameters from the current URL
  //     const params = new URLSearchParams(window.location.search);
  //     // Append URL parameters to the fetch URL
  //     params.forEach((value, key) => {
  //       url.searchParams.append(key, value);
  //     });
  //     // Fetch data from the server using updatedURL
  //     const response = await fetch(url.toString());
  //     // update the 'posts' store with the fetched data
  //     if (response.ok) {
  //       const data = await response.json();
  //       posts.set(data);
  //     } else {
  //       console.error("Failed to fetch product data");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //   }
  // }

  // // Call fetchProductData function when the component mounts
  // onMount(fetchProductData);
</script>

<!-- This will be used in future for product post page -->
<!-- <div on:click={() => navigateToSomePage()} class="grid grid-cols-5 gap-4"> -->
<div class="grid grid-cols-5 gap-4">
  <!-- Filter using one APPROVED posts by Admin -->
  {#each $posts.filter((post) => post.status === "APPROVED") as product}
    <Card class="col-span-1">
      <div class="relative h-full flex flex-col">
        <img
          class="object-cover w-full h-64"
          src={`/image/${product.image_file}`}
          alt={product.item_name}
        />
        <div class="p-4 flex-grow flex flex-col justify-end bg-white">
          <p class="mb-2 text-2xl font-bold">{product.item_name}</p>
          <p class="mb-2 text-">{product.item_description}</p>
          <p class="mb-2 text-xl font-black">${product.price}</p>
          <Button class="text-xl mt-auto">Message</Button>
        </div>
      </div>
    </Card>
  {/each}
</div>
