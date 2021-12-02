<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';
    import Annotations from './Annotations.svelte';

    import { option } from './stores';

    let math = true;
    let visible = true;

    function rerender(){
        visible = false;
        setTimeout(() => {
            visible = true;
        }, 1);
    }
</script>

<main>
    <div>
        <button on:click={rerender}>play</button>
        <input type="number" bind:value={$option.r}>
        <input type="number" bind:value={$option.swidth} disabled={math?"disabled":""}>
        <input type="number" bind:value={$option.cwidth} disabled={math?"disabled":""}>
        <input type="text" bind:value={$option.stroke}>
        <input type="text" bind:value={$option.accent}>
        <input type="text" bind:value={$option.background}>
        <input type="checkbox" on:click={rerender} bind:checked={math}>
    </div>
    {#if visible}
        <Pentadecagon {math}/>
        {#if math}
            <Annotations/>
            <style>
                svg{
                    position: absolute;
                }
            </style>
        {/if}
    {/if}
</main>
