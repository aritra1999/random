<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>rand0m</title>
</svelte:head>

<Navbar />
<div class="container py-20 px-2 mx-auto">
    <slot />
</div>
<Footer />
