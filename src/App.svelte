<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';

    let option = {
        r: 500,
        swidth: 20,
        cwidth: 20,
        stroke: 'white',
        accent: '#39c5bb',
        background: 'black',
    };
    let math = false;
</script>

<main>
    <div>
        <input type="number" bind:value={option.r}>
        <input type="number" bind:value={option.swidth} disabled={math?"disabled":""}>
        <input type="number" bind:value={option.cwidth} disabled={math?"disabled":""}>
        <input type="text" bind:value={option.stroke}>
        <input type="text" bind:value={option.accent}>
        <input type="text" bind:value={option.background}>
        <input type="checkbox" bind:checked={math}>
    </div>
    {#if math}
        <Pentadecagon {...option} swidth={1} cwidth={1} math={math}/>
    {:else}
        <Pentadecagon {...option}/>
    {/if}
</main>
