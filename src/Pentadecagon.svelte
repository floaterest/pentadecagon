<script lang="ts">
	import { blur, draw } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	import { option, coords, fifteenth } from './stores';
	import type { Transition } from './Interfaces';

	export let math: boolean;
	export let transition: Transition;

	// disable animation if math
	const drw = math ? () => {
	} : (node, { delay, duration }) => draw(node, {
		delay,
		duration,
		easing: linear
	});

	let r, size, r2, o, swidth, cwidth, stroke, accent, background;
	$:(() => ({
		r,
		size,
		r2,
		o,
		swidth,
		cwidth,
		stroke,
		accent,
		background
	} = $option))();

	// set all stroke widths to 1 if math
	$: sw = math ? 1 : swidth;
	$: cw = math ? 1 : cwidth;
</script>

<svg width={size} height={size} stroke-width={sw} {stroke}
     style="background-color:{background};">
    <!-- outer circle -->
    <path d="M{o} {$coords.ay} A{r} {r} 0 0 1 {o} {$coords.bx} A{r} {r} 0 1 1 {o} {$coords.ay}"
          stroke-width={cw} in:drw="{transition.circle}"></path>
    <!-- x axis -->
    <line x1={$coords.bx} y1={o} x2={$coords.ay} y2={o}
          in:drw="{transition.xaxis}"></line>
    <!-- y axis -->
    <line x1={o} y1={$coords.bx} x2={o} y2={$coords.ay}
          in:drw="{transition.yaxis}"></line>
    <!-- CD line -->
    <line x1={$coords.mx} y1={$coords.dy} x2={$coords.mx} y2={$coords.cy}
          in:drw="{transition.cdl}"></line>
    <!-- CD arc -->
    <path d="M{$coords.mx} {$coords.dy} A{r} {r} 0 0 1 {$coords.mx} {$coords.cy}"
          in:drw="{transition.cda}"></path>
    <!-- AM line -->
    <line x1={$coords.mx} y1={o} x2={o} y2={$coords.ay}
          in:drw="{transition.aml}"></line>
    <!-- OE arc -->
    <path d="M{o} {o} A{r2} {r2} 0 0 1 {$coords.nx} {$coords.ey}"
          in:drw="{transition.oea}"></path>
    <!-- OG arc -->
    <path d="M{o} {o} A{r} {r} 0 0 1 {$coords.cy} {$coords.gy}"
          in:drw="{transition.oga}"></path>
    <!-- EF arc -->
    <path d="M{$coords.nx} {$coords.ey} A{$coords.AF} {$coords.AF} 0 0 1 {$coords.fx} {$coords.fy}"
          in:drw="{transition.efa}"></path>

    {#if !math}
        <!-- FG arc (accent) -->
        <path d="M{$fifteenth.x1} {$fifteenth.y1}
                 A{$fifteenth.r1} {$fifteenth.r1} 0 0 1 {$fifteenth.x2} {$fifteenth.y2}
                 A{$fifteenth.r2} {$fifteenth.r2} 0 0 0 {$fifteenth.x3} {$fifteenth.y3}
                 A{$fifteenth.r3} {$fifteenth.r3} 0 0 0 {$fifteenth.x4} {$fifteenth.y4}
                 A{$fifteenth.r4} {$fifteenth.r4} 0 0 1 {$fifteenth.x1} {$fifteenth.y1}"
              fill={accent} stroke-width="0" in:blur={transition.fga}></path>
    {/if}
</svg>

<style lang="sass">
    svg
        fill: none
</style>
