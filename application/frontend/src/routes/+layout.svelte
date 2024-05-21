<script>
    import "../app.css";
    import Header from "$lib/components/main/layout/Header.svelte";
    import Nav from "$lib/components/main/layout/Nav.svelte";
    import Footer from "$lib/components/main/layout/Footer.svelte";
    import { onMount } from 'svelte';

    // Adding Google Analytics tracking code on mount
    onMount(() => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZRRPBNQ55F';
        script.async = true;
        document.head.appendChild(script);

        const script2 = document.createElement('script');
        script2.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZRRPBNQ55F');
        `;
        document.head.appendChild(script2);
    });
</script>

<Header />
<Nav />
<slot />
<Footer />
