<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: +page.svelte
*
* Description: Landing page for all
**************************************************************/ -->
<script lang="ts">
  import Carousel from "$lib/components/main/posts/Carousel.svelte";
  import PostCards from "$lib/components/main/posts/PostCards.svelte";

  let showCarousel = true;
  let showFilters = false;

  function handleSearchQueryChange(
    event: CustomEvent<{ searchQuery: string }>
  ) {
    showCarousel = !event.detail.searchQuery;
    showFilters = !!event.detail.searchQuery;
  }
  function handleSearchButtonClick() {
    showCarousel = false;
    showFilters = true;
  }
</script>

<title>GatorTrader | Homepage</title>
<!--
<Header />
<Nav
  on:searchQueryChange={handleSearchQueryChange}
  on:searchButtonClick={handleSearchButtonClick}
/> -->
<!-- {#if showCarousel} -->
<Carousel />

<!-- {/if} -->
<!-- {#if showFilters}
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
{/if} -->
<!-- <Footer /> -->
