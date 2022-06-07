<script lang="ts">
    import Pentadecagon from './Pentadecagon.svelte';

    import { option, createOption } from './stores';
    import { transitions, init } from './constants';
    import type { Transition } from './Interfaces';

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
        <input type="number" bind:value={opt.swidth}>
        <input type="number" bind:value={opt.cwidth}>
        <input type="text" bind:value={opt.stroke}>
        <input type="text" bind:value={opt.accent}>
        <input type="text" bind:value={opt.background}>
    </div>
    <div>
        {#each transitions as tr,i}
            <button on:click={()=>chtr(tr)}>{i}</button>
        {/each}
    </div>
    {#if visible}
        <Pentadecagon {transition}/>
    {/if}
</main>
