<script lang="ts">
  import Header from "$lib/components/main/layout/Header.svelte";
  import Footer from "$lib/components/main/layout/Footer.svelte";
  import Nav from "$lib/components/main/layout/Nav.svelte";
  import PostCards from "$lib/components/main/posts/PostCards.svelte";
  import Carousel from "$lib/components/main/posts/Carousel.svelte";
  import Results from "$lib/components/main/posts/Results.svelte";
  import Filter from "$lib/components/main/layout/Filter.svelte";

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

<Header />
<Nav
  on:searchQueryChange={handleSearchQueryChange}
  on:searchButtonClick={handleSearchButtonClick}
/>
{#if showCarousel}
  <Carousel />
{/if}
<Results />
{#if showFilters}
  <div style="display: flex">
    <div
      style="flex-direction: column; padding: 5px; border: 1px; width: 12%; border-radius: 3px; box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.2);"
    >
      <Filter />
    </div>
    <div style="flex-direction: column; padding: 5px">
      <PostCards />
    </div>
  </div>
{:else}
  <PostCards />
{/if}
<Footer />
