<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: +page.svelte
*
* Description: Browse page for handling search results
**************************************************************/ -->
<script lang="ts">
  import { onMount } from "svelte";
  import Results from "$lib/components/main/posts/Results.svelte";
  import Filter from "$lib/components/main/layout/Filter.svelte";
  import PostCards from "$lib/components/main/posts/PostCards.svelte";
  import { } from "flowbite-svelte";
  import ProductPost from "$lib/components/main/posts/ProductPost.svelte";


  import { Pagination, PaginationItem, Label, Checkbox, A } from 'flowbite-svelte';
    import { it } from "date-fns/locale";

  let page = 1;
  let total = 0;
  let itemsPerPage = 8;
  let priceDesc = false;
  let priceAsc = false;
  $: helper = {
    start: Math.min((page - 1) * itemsPerPage + 1, total),
    end: Math.min(page * itemsPerPage, total),
    total,
  };
  $: sortByPrice = priceDesc ? 1 : priceAsc ? 2 : 0;

  const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.');
  };
  const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.');
  };

  $: posts = [];

  onMount(async() => {
    const params = new URLSearchParams(
      {
        limit: itemsPerPage.toString(),
        page: page.toString(),
        sortByPrice: sortByPrice.toString(),}
    );
    updatePosts();
    const response = await fetch('/getPostsCount/');
    const data = await response.json();
    total = parseInt(data.count);
  })

  function getNextPosts() {
    page++;
    if (page > Math.ceil(total / itemsPerPage)) {
      page = Math.ceil(total / itemsPerPage);
      return;
    }
    updatePosts();
  }

  function getPrevPosts() {
    page--;
    if (page < 1) {
      page = 1;
      return;
    }
    updatePosts();
  }

  function updatePosts() {
    const params = new URLSearchParams(
      {
        limit: itemsPerPage.toString(),
        page: page.toString(),
        sortByPrice: sortByPrice.toString(),
      }
    );

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
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // FILTER
  function handleCheckboxClick(event) {
    const { id, checked } = event.target;
    console.log('SOMETHING IS HAPPENING');
    switch(id) {
      case 'priceLowToHigh':
        priceAsc = checked;
        if (checked) {
          console.log('ascneding order');

          priceDesc = false;
        }
        sortByPrice = 2;
        break;
      case 'priceHighToLow':
        priceDesc = checked;
        if (checked) {
          console.log('dscending order');

          priceAsc = false;
        }
        sortByPrice = 1;
        break;
      default:
        sortByPrice = 0;
        break;
    }
    updatePosts();
  }
</script>

<title>GatorTrader | Gallery</title>

<!-- <Results /> -->
<div style="display: flex">
  <div
    style="flex-direction: column; padding: 5px; border: 1px; width: 12%; border-radius: 3px; box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.2);"
  >
  <div class="text-sm text-gray-700 dark:text-gray-400">
    Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span>
    to
    <span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
    of
    <span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span>
    Entries
  </div>
    <!-- <Filter /> -->
    <div
      class="rounded border border-gray-200 dark:border-gray-700"
      style="padding-bottom:10px"
    >
      <Label>Sort By:</Label>
      <Checkbox id="priceLowToHigh" checked={priceAsc} on:click={handleCheckboxClick}>Price: Low to high</Checkbox>
      <Checkbox id="priceHighToLow" checked={priceDesc} on:click={handleCheckboxClick}>Price: High to low</Checkbox>

    </div>
  </div>
  <div style="flex-direction: column; padding: 5px"></div>
  <!-- Show products -->
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    {#each posts as post}
      <ProductPost {post} />
    {/each}
  </div>
</div>

<!-- Pagination -->

<div class="flex flex-col items-center justify-center gap-2 mt-2">
  <div class="text-sm text-gray-700 dark:text-gray-400">
    Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span>
    to
    <span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
    of
    <span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span>
    Entries
  </div>


<div class="flex flex-col items-center justify-center gap-2">

  <div class="flex space-x-3 rtl:space-x-reverse">
    <PaginationItem normalClass="bg-slate-800" on:click={getPrevPosts}>Previous</PaginationItem>
    <PaginationItem normalClass="bg-slate-800" on:click={getNextPosts}>Next</PaginationItem>
  </div>
</div>

</div>
<!-- end pagination -->