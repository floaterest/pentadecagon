<script lang="ts">
    import { option, coords, fifteenth } from './stores';

    import { blur, draw } from 'svelte/transition';
    import { linear } from 'svelte/easing';

    const drw = (node, { delay, duration }) => draw(node, { delay, duration, easing: linear });

    export let math: boolean;
    const { r, size, r2, o, swidth, cwidth, stroke, accent, background } = $option;
    // set all stroke widths to 1 if math
    $: sw = math ? 1 : swidth;
    $: cw = math ? 1 : cwidth;


    // configuration for animations
    $: anime = ((duration: number) => ({
        circle: {
            duration,
        },
        axis: {
            duration: duration / 2,
            delay: duration / 2,
        },
        cdl: {
            duration: duration / 3,
            delay: duration * 5 / 12,
        },
        cda: {
            duration: duration / 3,
            delay: duration * 5 / 12,
        },
        aml: {
            duration: duration / 6,
            delay: duration * 7 / 12,
        },
        oea: {
            duration: duration / 12,
            delay: duration * 3 / 4,
        },
        oga: {
            duration: duration / 12,
            delay: duration * 3 / 4,
        },
        efa: {
            duration: duration / 15,
            delay: duration * 5 / 6,
        },
        fga: {
            duration: duration / 10,
            delay: duration * 9 / 10,
        },
    }))(10000);
</script>

<svg width={size} height={size} stroke-width={sw} {stroke}
     style="background-color:{background};">
    <!-- outer circle -->
    <path d="M{o} {$coords.ay} A{r} {r} 0 0 1 {o} {$coords.bx} A{r} {r} 0 1 1 {o} {$coords.ay}"
          stroke-width={cw} in:drw="{anime.circle}"></path>
    <!-- x axis -->
    <line x1={$coords.bx} y1={o} x2={$coords.ay} y2={o}
          in:drw="{anime.axis}"></line>
    <!-- y axis -->
    <line x1={o} y1={$coords.bx} x2={o} y2={$coords.ay}
          in:drw="{anime.axis}"></line>
    <!-- CD line -->
    <line x1={$coords.mx} y1={$coords.dy} x2={$coords.mx} y2={$coords.cy}
          in:drw="{anime.cdl}"></line>
    <!-- CD arc -->
    <path d="M{$coords.mx} {$coords.dy} A{r} {r} 0 0 1 {$coords.mx} {$coords.cy}"
          in:drw="{anime.cda}"></path>
    <!-- AM line -->
    <line x1={$coords.mx} y1={o} x2={o} y2={$coords.ay}
          in:drw="{anime.aml}"></line>
    <!-- OE arc -->
    <path d="M{o} {o} A{r2} {r2} 0 0 1 {$coords.nx} {$coords.ey}"
          in:drw="{anime.oea}"></path>
    <!-- OG arc -->
    <path d="M{o} {o} A{r} {r} 0 0 1 {$coords.cy} {$coords.gy}"
          in:drw="{anime.oga}"></path>
    <!-- EF arc -->
    <path d="M{$coords.nx} {$coords.ey} A{$coords.AF} {$coords.AF} 0 0 1 {$coords.fx} {$coords.fy}"
          in:drw="{anime.efa}"></path>

    {#if !math}
        <!-- FG arc (accent) -->
        <path d="M{$fifteenth.x1} {$fifteenth.y1}
                 A{$fifteenth.r1} {$fifteenth.r1} 0 0 1 {$fifteenth.x2} {$fifteenth.y2}
                 A{$fifteenth.r2} {$fifteenth.r2} 0 0 0 {$fifteenth.x3} {$fifteenth.y3}
                 A{$fifteenth.r3} {$fifteenth.r3} 0 0 0 {$fifteenth.x4} {$fifteenth.y4}
                 A{$fifteenth.r4} {$fifteenth.r4} 0 0 1 {$fifteenth.x1} {$fifteenth.y1}"
              fill={accent} stroke-width="0" in:blur={anime.fga}></path>
    {/if}
</svg>

<style>
    svg{
        fill: none;
    }
</style>
