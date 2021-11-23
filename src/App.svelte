<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';

    let option = {
        r: 500,
        swidth: 25,
        cwidth: 50,
        stroke: 'white',
        accent: '#39c5bb',
        background: 'black',
    };
</script>

<main>
    <div>
        <input type="number" bind:value={option.r}>
        <input type="number" bind:value={option.swidth}>
        <input type="number" bind:value={option.cwidth}>
        <input type="text" bind:value={option.stroke}>
        <input type="text" bind:value={option.accent}>
        <input type="text" bind:value={option.background}>
    </div>
    <Pentadecagon {...option}/>
</main>
