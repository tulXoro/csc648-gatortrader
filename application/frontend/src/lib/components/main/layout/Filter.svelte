<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: Filter.svelte
*
* Description: Component will be a sidebar with togglable filter buttons.
**************************************************************/ -->

<script lang="ts">
  import { Label, Checkbox } from "flowbite-svelte";
  import { posts, updateTrigger } from "$lib/stores/store";

  // Default sort order
  let sortOrder = "dsc";

  // Derived store to filter and sort posts based on status and price
  $: filteredPosts = $posts
    .filter((post) => post.status === "APPROVED") // Only show approved posts
    .sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      // Sort based on the selected order
      if (sortOrder === "asc") {
        return priceB - priceA;
      } else {
        return priceA - priceB;
      }
    });

  // Variables to keep track of checkbox states
  let priceLowToHigh = false;
  let priceHighToLow = false;

  // Function to handle checkbox click events
  function handleCheckboxClick(event) {
    const { id, checked } = event.target;
    switch(id) {
      case 'priceLowToHigh':
        priceLowToHigh = checked; // Update state for 'Low to High' checkbox
        if (checked) {
          console.log('ascending order');
          sortOrder = "asc";
          priceHighToLow = false; // Uncheck the 'High to Low' checkbox
        }
        break;
      case 'priceHighToLow':
        priceHighToLow = checked; // Update state for 'High to Low' checkbox
        if (checked) {
          console.log('descending order');
          sortOrder = "dsc";
          priceLowToHigh = false; // Uncheck the 'Low to High' checkbox
        }
        break;
      default:
        break;
    }

    console.log(filteredPosts); // Log the filtered posts for debugging

    // Trigger an update to the store to refresh the filtered posts
    if (sortOrder === 'dsc') {
      updateTrigger.set(1);
    } else if (sortOrder === 'asc') {
      updateTrigger.set(2);
    }
  }
</script>

<!-- Sidebar container for filter options -->
<div
  class="rounded border border-gray-200 dark:border-gray-700"
  style="padding-bottom:10px"
>
  <Label>Sort By:</Label>
  <!-- Checkbox for sorting by price from low to high -->
  <Checkbox id="priceLowToHigh" checked={priceLowToHigh} on:click={handleCheckboxClick}>
    Price: Low to high
  </Checkbox>
  <!-- Checkbox for sorting by price from high to low -->
  <Checkbox id="priceHighToLow" checked={priceHighToLow} on:click={handleCheckboxClick}>
    Price: High to low
  </Checkbox>
</div>
