<script>
		import Nav from '$lib/components/main/Nav.svelte';
		import Footer from '$lib/components/main/Footer.svelte';
		import Header from '$lib/components/main/Header.svelte';

		import Profile from '$lib/components/about/Profile.svelte';
</script>

<!-- Commented out because nav obstructs profile right now -->
<!-- <Nav /> -->

<Header />

<Profile name="Jayden Wong"
		photo="https://via.placeholder.com/300"
		bio="This is a bio"
		role="Back End Lead"

		github="https://github.com/jwong51"
		linkedin="https://linkedin.com"
		email="jwong51@mail.sfsu.edu"
/>

<Footer />