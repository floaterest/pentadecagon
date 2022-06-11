<script lang="ts">
	import Pentadecagon from './Pentadecagon.svelte';

	import { option, createOption } from './stores';
	import { transition, init } from './constants';
	import type { Transition } from './Interfaces';

	let visible = true;

	function rerender(){
		visible = false;
		setTimeout(() => {
			visible = true;
		}, 1);
	}

	let opt = { ...init };
	$: option.set(createOption(opt));
</script>

<main>
    <div>
        <input type="number" bind:value={opt.r}>
        <input type="number" bind:value={opt.swidth}>
        <input type="number" bind:value={opt.cwidth}>
        <input type="text" bind:value={opt.stroke}>
        <input type="text" bind:value={opt.accent}>
        <input type="text" bind:value={opt.background}>
    </div>
    <div>
        <button on:click={rerender}>animate</button>
    </div>
    {#if visible}
        <Pentadecagon {transition}/>
    {/if}
</main>
