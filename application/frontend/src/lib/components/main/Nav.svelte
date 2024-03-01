<script>
  import { page } from "$app/stores";
  import { Heading } from "flowbite-svelte";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";
  $: activeUrl = $page.url.pathname;
</script>

<Navbar>
  <NavBrand href="/">
    <img src="/SFSU.png" class="me-3 h-234 sm:h-9" alt="SFSU Logo" />
    <Heading tag="h1">SFSU Market</Heading>
  </NavBrand>
  <NavHamburger />
  <NavUl {activeUrl}>
    <NavLi href="#">Sell</NavLi>
    <NavLi href="#">Alerts</NavLi>
    <NavLi href="#">My Profile</NavLi>
  </NavUl>
</Navbar>
