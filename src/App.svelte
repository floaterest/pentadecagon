<script lang="ts">
	import Complete from './Complete.svelte'
</script>

<main>
	<Complete r={500} swidth={10} scolor="white" background="black" accent="#39c5bb"/>
</main>

<style lang="less">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
