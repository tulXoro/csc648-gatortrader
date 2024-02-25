<script>
    import Nav from '$lib/components/main/Nav.svelte';
    import Footer from '$lib/components/main/Footer.svelte';
    import Header from '$lib/components/main/Header.svelte';

    import Profile from '$lib/components/about/Profile.svelte';
</script>

<!-- Commented out because nav obstructs profile right now -->
<!-- <Nav /> -->

<Header />

<Profile name="Haley Park"
    photo="https://via.placeholder.com/300"
    bio="This is a bio"
    role="This is a role"

    github="https://github.com/jung-hyeon"
    linkedin="https://linkedin.com"
    email="jpark58@sfsu.edu"
/>

<Footer />