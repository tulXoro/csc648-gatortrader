<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: +page.svelte
*
* Description: This is the main page showcasing all the components
* linking all page routes.
**************************************************************/ -->
<script>
  import Header from "$lib/components/main/Header.svelte";
  import Footer from "$lib/components/main/Footer.svelte";
  import Nav from "$lib/components/main/Nav.svelte";
  import PostCards from "$lib/components/main/PostCards.svelte";
  import Carousel from "$lib/components/main/Carousel.svelte";
  import Results from "$lib/components/main/Results.svelte";
</script>

<title>GatorTrader | Homepage</title>

<Header />
<Nav />
<Results />
<!-- <Carousel/> -->
<PostCards />
<Footer />
