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
  // Derived store to filter and sort posts
  // const filteredPosts = derived(posts, $posts => {
  //   return $posts
  //     .filter(post => post.status === "APPROVED")
  //     .sort((a, b) => {
  //       const priceA = a.price;
  //       const priceB = b.price;
  //       if (sortOrder === "asc") {
  //         return priceA - priceB;
  //       } else {
  //         return priceB - priceA;
  //       }
  //     });
  // });

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



<!-- <div
  class="rounded border border-gray-200 dark:border-gray-700"
  style="padding-bottom:10px"
>
  <Label>Post Date</Label>
  <Checkbox id="lessThan3Days" checked={lessThan3Days} on:click={handleCheckboxClick}>Less than 3 days ago</Checkbox>
  <Checkbox id="days3To2Weeks" checked={days3To2Weeks} on:click={handleCheckboxClick}>3 days to 2 weeks</Checkbox>
  <Checkbox id="over2Weeks" checked={over2Weeks} on:click={handleCheckboxClick}>Over 2 weeks</Checkbox>

</div> -->

<!-- <Range id="range-steps" min="0" max="9999" bind:value={stepValue} step="0.25" />
<p>Value: {stepValue}</p> -->
<!--   
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Dashboard">
          <svelte:fragment slot="icon">
            <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
            
        </SidebarItem>
        <SidebarItem label="Price">
            <Range id="range-steps" min="0" max="9999" bind:value={stepValue} step="0.25" />
            <p>Value: {stepValue}</p>
        </SidebarItem>
     
      
       
  
        
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar> -->
