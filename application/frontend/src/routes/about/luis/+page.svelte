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
  bio="This is a bio"
  role="Front End Lead"
  github="https://github.com/langeles014"
  linkedin="https://linkedin.com/langeles014"
  email="langelestavera@sfsu.edu"
/>

<Footer />
