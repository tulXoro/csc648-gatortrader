<!-- /**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: +layout.svelte
*
* Description: global components used throughout the site 
**************************************************************/ -->
<script>
  import "../app.css";
  import Header from "$lib/components/main/layout/Header.svelte";
  import Nav from "$lib/components/main/layout/Nav.svelte";
  import Footer from "$lib/components/main/layout/Footer.svelte";
  import FlashMessages from "$lib/components/main/popUps/flashMessages.svelte";
</script>

<Header />
<Nav />
<FlashMessages />

<slot />

<Footer />
