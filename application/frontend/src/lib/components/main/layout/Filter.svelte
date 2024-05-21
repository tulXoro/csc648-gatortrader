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
  import { Label, Checkbox, A } from "flowbite-svelte";
  import { derived } from "svelte/store";
  import { posts, updateTrigger } from "$lib/stores/store";



  let sortOrder = "dsc";

  $: filteredPosts = $posts
    .filter((post) => post.status === "APPROVED")
   
    .sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      if(sortOrder === "asc"){
        
      return priceB - priceA;
      } else {
        return priceA - priceB;
      }

    });
 
  let priceLowToHigh = false;
  let priceHighToLow = false;
  

  function handleCheckboxClick(event) {
    const { id, checked } = event.target;
    console.log('SOMETHING IS HAPPENING');
    switch(id) {
      case 'priceLowToHigh':
        priceLowToHigh = checked;
        if (checked) {
          console.log('ascneding order');
          sortOrder = "asc";
          priceHighToLow = false;
        }
        break;
      case 'priceHighToLow':
        priceHighToLow = checked;
        if (checked) {
          console.log('dscending order');
          sortOrder = "dsc";
          priceLowToHigh = false;
        }
        break;
      default:
        break;
    }

    console.log(filteredPosts);
    if(sortOrder === 'dsc'){
      updateTrigger.set(1);
    } else if(sortOrder==='asc'){
      updateTrigger.set(2);
    }
  }


</script>

<div
  class="rounded border border-gray-200 dark:border-gray-700"
  style="padding-bottom:10px"
>
  <Label>Sort By:</Label>
  <Checkbox id="priceLowToHigh" checked={priceLowToHigh} on:click={handleCheckboxClick}>Price: Low to high</Checkbox>
  <Checkbox id="priceHighToLow" checked={priceHighToLow} on:click={handleCheckboxClick}>Price: High to low</Checkbox>

</div>

