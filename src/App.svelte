<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';
    import { opt } from './stores';

    let math = false;
    let visible = true;

    function handleClick(){
        visible = false;
        setTimeout(() => {
            visible = true;
        }, 1);
    }
</script>

<main>
    <div>
        <button on:click={handleClick}>play</button>
        <input type="number" bind:value={$opt.r}>
        <input type="number" bind:value={$opt.swidth} disabled={math?"disabled":""}>
        <input type="number" bind:value={$opt.cwidth} disabled={math?"disabled":""}>
        <input type="text" bind:value={$opt.stroke}>
        <input type="text" bind:value={$opt.accent}>
        <input type="text" bind:value={$opt.background}>
        <input type="checkbox" bind:checked={math}>
    </div>
    {#if visible}
        {#if math}
            <Pentadecagon {math}/>
        {:else}
            <Pentadecagon {math}/>
        {/if}
    {/if}
</main>
