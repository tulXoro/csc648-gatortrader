<script>
	import Nav from "$lib/components/main/Nav.svelte";
	import Header from "$lib/components/main/Header.svelte";
	import Footer from "$lib/components/main/Footer.svelte";
</script>

<Header/>
<Nav/>

<div class="ml-20 flex-grow">
	<div class="carousel ml-64 flex items-center overflow-x-auto mb-8">
		<button class="prev" onclick="moveSlide(-1)">❮</button>
		<img src="https://fakeimg.pl/100/" class="flex-none">
		<img src="https://fakeimg.pl/100/" class="flex-none">
		<img src="https://fakeimg.pl/100/" class="flex-none">
		<img src="https://fakeimg.pl/100/" class="flex-none">
		<img src="https://fakeimg.pl/100/" class="flex-none">
		<img src="https://fakeimg.pl/100/" class="flex-none">
		<img src="https://fakeimg.pl/100/" class="flex-none">
		<img src="https://fakeimg.pl/100/" class="flex-none">
		<button class="next" onclick="moveSlide(1)">❯</button>
	</div>

	<div class="grid-posts ml-64 grid grid-cols-4 gap-4">
		<img src="https://fakeimg.pl/100x100/?text=post 1">
		<img src="https://fakeimg.pl/100x100/?text=post 2">
		<img src="https://fakeimg.pl/100x100/?text=post 3">
		<img src="https://fakeimg.pl/100x100/?text=post 4">
		<img src="https://fakeimg.pl/100x100/?text=post 5">
		<img src="https://fakeimg.pl/100x100/?text=post 6">
		<img src="https://fakeimg.pl/100x100/?text=post 7">
		<img src="https://fakeimg.pl/100x100/?text=post 8">
		<img src="https://fakeimg.pl/100x100/?text=post 9">
		<img src="https://fakeimg.pl/100x100/?text=post 10">
		<img src="https://fakeimg.pl/100x100/?text=post 11">
		<img src="https://fakeimg.pl/100x100/?text=post 12">
		<img src="https://fakeimg.pl/100x100/?text=post 13">
		<img src="https://fakeimg.pl/100x100/?text=post 14">
		<img src="https://fakeimg.pl/100x100/?text=post 15">
		<img src="https://fakeimg.pl/100x100/?text=post 16">
	</div>
</div>

<Footer/>
