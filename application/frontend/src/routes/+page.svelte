<script>
  import Header from "$lib/components/main/Header.svelte";
  import Footer from "$lib/components/main/Footer.svelte";
  import Nav from "$lib/components/main/Nav.svelte";
  import PostCards from "$lib/components/main/PostCards.svelte";
  import { Carousel } from "flowbite-svelte";
  import Results from "$lib/components/main/Results.svelte";
</script>

<title>GatorTrader Homepage</title>

<Header></Header>
<Nav></Nav>
<Results></Results>
<!-- <Carousel></Carousel> -->
<PostCards></PostCards>
<Footer></Footer>
