<script>
    import Nav from '$lib/components/main/Nav.svelte';
    import Footer from '$lib/components/main/Footer.svelte';
    import Header from '$lib/components/main/Header.svelte';
    import img from '$lib/assets/image.jpg';
    import Profile from '$lib/components/about/Profile.svelte';
</script>

<!-- Commented out because nav obstructs profile right now -->
<!-- <Nav /> -->

<Header />

<Profile name="Cole Douglas"
    photo={img}
    bio="This is a bio"
    role="floater/assistant to any and all"

    github="https://github.com/cole-d"
    linkedin="https://linkedin.com"
    email="cdouglas8@sfsu.edu"
/>

<Footer />