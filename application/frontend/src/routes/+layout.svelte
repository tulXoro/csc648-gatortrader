<script>
    import "../app.css";
    import Header from "$lib/components/main/layout/Header.svelte";
    import Nav from "$lib/components/main/layout/Nav.svelte";
    import Footer from "$lib/components/main/layout/Footer.svelte";
</script>

<Header />
<Nav />

<slot />

<Footer />