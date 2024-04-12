<script>
  import Nav from "$lib/components/main/Nav.svelte";
  import Footer from "$lib/components/main/Footer.svelte";
  import Header from "$lib/components/main/Header.svelte";

  import Profile from "../../Profile.svelte";
</script>

<!-- Commented out because nav obstructs profile right now -->
<!-- <Nav /> -->

<Header />
<Nav />

<Profile
  name="Parampal Singh"
  bio="This is a bio"
  role="Github Master"
  github="https://github.com/singh-paul"
  linkedin="https://www.linkedin.com/in/parampal-singh-1a2978172/"
  email="psingh17@sfsu.edu"
/>

<Footer />
