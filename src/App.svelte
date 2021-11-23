<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';

    let option = {
        r: 500,
        swidth: 20,
        bwidth: 40,
        stroke: 'white',
        accent: '#39c5bb',
        background: 'black',
    };
</script>

<main>
    <div>
        <input type="number" bind:value={option.r}>
        <input type="number" bind:value={option.swidth}>
        <input type="number" bind:value={option.bwidth}>
        <input type="text" bind:value={option.stroke}>
        <input type="text" bind:value={option.accent}>
        <input type="text" bind:value={option.background}>
    </div>
    <Pentadecagon {...option}/>
</main>
