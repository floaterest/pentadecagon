<script lang="ts">
    import { option, coords, fifteenth } from './stores';

    import { blur, draw } from 'svelte/transition';
    import { linear } from 'svelte/easing';

    const drw = (node, { delay, duration }) => draw(node, { delay, duration, easing: linear });

    export let math: boolean = false;
    const { r, size, r2, o, swidth, cwidth, stroke, accent, background } = $option;
    // set all stroke widths to 1 if math
    $: sw = math ? 1 : swidth;
    $: cw = math ? 1 : cwidth;

    // font size for marking coordinates
    $: fs = r / 25;
    $: fs2 = fs / 2;
    // svg path for the right angle mark
    $: square = `m0 ${-fs} l${fs} 0 l0 ${fs}`;

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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}"
     width={size} height={size} fill="none"
     stroke-width={sw} {stroke}
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

    {#if math}
        <!-- auxiliary lines at CB EN GP GO AF -->
        <path d="M{$coords.mx} {$coords.cy} L{$coords.bx} {o}
                 M{$coords.nx} {$coords.ey} V{o}
                 M{$coords.cy} {o} v{-r2}
                 L{o} {o}
                 m0 {-r} L{$coords.fx} {$coords.fy}"
              stroke-dasharray={r / 50}></path>
        <!-- right angles at M N O P -->
        <path d="M{$coords.mx} {o} {square}
                 M{$coords.nx} {o} {square}
                 M{o} {o} {square}
                 M{$coords.cy} {o} {square}"></path>
    {:else}
        <!-- FG arc (accent) -->
        <path d="M{$fifteenth.x1} {$fifteenth.y1}
                 A{$fifteenth.r1} {$fifteenth.r1} 0 0 1 {$fifteenth.x2} {$fifteenth.y2}
                 A{$fifteenth.r2} {$fifteenth.r2} 0 0 0 {$fifteenth.x3} {$fifteenth.y3}
                 A{$fifteenth.r3} {$fifteenth.r3} 0 0 0 {$fifteenth.x4} {$fifteenth.y4}
                 A{$fifteenth.r4} {$fifteenth.r4} 0 0 1 {$fifteenth.x1} {$fifteenth.y1}"
              fill={accent} stroke-width="0" in:blur={anime.fga}></path>
    {/if}
</svg>

{#if math}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}"
         width={size} height={size} fill={stroke} font-size={fs}>
        <text x={o+fs} y={$coords.ay+fs}>A(o,ay)</text>
        <text x={$coords.bx-fs*5} y={o-fs2}>B(bx,o)</text>
        <text x={$coords.mx+fs2} y={$coords.cy-fs2}>C(mx,cy)</text>
        <text x={$coords.mx} y={$coords.dy+fs}>D(mx,dy)</text>
        <text x={$coords.nx+fs2} y={$coords.ey-fs2}>E(nx,ey)</text>
        <text x={$coords.fx+fs2} y={$coords.fy+fs2}>F(fx,fy)</text>
        <text x={$coords.cy+fs2} y={$coords.gy}>G(cy,gy)</text>

        <text x={$coords.mx+fs2} y={o+fs}>M(mx,o)</text>
        <text x={$coords.nx+fs2} y={o+fs}>N(nx,o)</text>
        <text x={o+fs2} y={o+fs}>O(o,o)</text>
        <text x={$coords.cy+fs2} y={o+fs}>P(cy,o)</text>
    </svg>
    <style>
        svg{
            position: absolute;
        }

        text{
            font-family: "Courier", sans-serif;
        }
    </style>
{/if}
