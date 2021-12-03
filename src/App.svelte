<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';
    import Annotations from './Annotations.svelte';

    import { option } from './stores';
    import { transitions } from './constants';
    import type { Transition } from './Interfaces';

    let math = false;
    let visible = true;
    let transition = transitions[0];

    function rerender(){
        visible = false;
        setTimeout(() => {
            visible = true;
        }, 1);
    }

    function chtr(tr: Transition){
        transition = tr;
        rerender();
    }
</script>

<main>
    <div>
        <input type="number" bind:value={$option.r}>
        <input type="number" bind:value={$option.swidth} disabled={math?"disabled":""}>
        <input type="number" bind:value={$option.cwidth} disabled={math?"disabled":""}>
        <input type="text" bind:value={$option.stroke}>
        <input type="text" bind:value={$option.accent}>
        <input type="text" bind:value={$option.background}>
        <input type="checkbox" on:click={rerender} bind:checked={math}>
    </div>
    <div>
        {#each transitions as tr,i}
            <button on:click={()=>chtr(tr)} disabled={math?"disabled":""}>{i}</button>
        {/each}
    </div>
    {#if visible}
        <Pentadecagon {math} {transition}/>
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
