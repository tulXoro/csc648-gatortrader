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
  import Results from "$lib/components/main/posts/Results.svelte";
  import Filter from "$lib/components/main/layout/Filter.svelte";
  import PostCards from "$lib/components/main/posts/PostCards.svelte";
</script>

<title>GatorTrader | Gallery</title>
<Results />
<div style="display: flex">
  <div
    style="flex-direction: column; padding: 5px; border: 1px; width: 12%; border-radius: 3px; box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.2);"
  >
    <Filter />
  </div>
  <div style="flex-direction: column; padding: 5px"></div>
  <PostCards />
</div>
