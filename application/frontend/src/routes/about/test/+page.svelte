<script>
  import Nav from "$lib/components/main/Nav.svelte";
  import Footer from "$lib/components/main/Footer.svelte";
  import Header from "$lib/components/main/Header.svelte";

  import Profile from "$lib/components/about/Profile.svelte";
</script>

<!-- Commented out because nav obstructs profile right now -->
<!-- <Nav /> -->

<Header />

<Profile
  name="Luis Angeles"
  bio="I am currently a Senior at SFSU..."
  role="Front End Lead"
  github="https://github.com/langeles"
  linkedin="https://linkedin.com/luisangeles"
  email="langelestaver@sfsu.edu"
/>

<Footer />
