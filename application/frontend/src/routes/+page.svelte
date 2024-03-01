<script>
  import Header from "$lib/components/main/Header.svelte";
  import Footer from "$lib/components/main/Footer.svelte";
  import Nav from "$lib/components/main/Nav.svelte";
  import SideBar from "$lib/components/main/SideBar.svelte";
  import { Heading } from "flowbite-svelte";
</script>

<Header></Header>
<Nav></Nav>
<Heading tag="h2">Homepage</Heading>
<SideBar></SideBar>

<Footer></Footer>
