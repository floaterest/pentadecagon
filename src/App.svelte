<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';

    let option = {
        r: 500,
        swidth: 20,
        stroke: 'white',
        accent: '#39c5bb',
        background: 'black',
    };
</script>

<main>
    <div>
        <input type="number" bind:value={option.r}>
        <input type="number" bind:value={option.swidth}>
    </div>
    <Pentadecagon {...option}/>
</main>
