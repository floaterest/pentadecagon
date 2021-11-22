<script lang="ts">
    import Complete from './Complete.svelte';

    let option = {
        radius: 500,
        swidth: 5,
        stroke: 'white',
        accent: '#39c5bb',
        background: 'black',
    };
</script>

<main>
    <div>
        <input type="number" bind:value={option.radius}>
        <input type="number" bind:value={option.swidth}>
    </div>
    <Complete {...option}/>
</main>
