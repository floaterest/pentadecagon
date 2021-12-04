<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';
    import Annotations from './Annotations.svelte';

    import { option, createOption } from './stores';
    import { transitions, init } from './constants';
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

    let opt = { ...init };
    $: option.set(createOption(opt));
</script>

<main>
    <div>
        <input type="number" bind:value={opt.r}>
        <input type="number" bind:value={opt.swidth} disabled={math?"disabled":""}>
        <input type="number" bind:value={opt.cwidth} disabled={math?"disabled":""}>
        <input type="text" bind:value={opt.stroke}>
        <input type="text" bind:value={opt.accent}>
        <input type="text" bind:value={opt.background}>
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
