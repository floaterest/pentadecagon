<script lang="ts">
    import { opt, cds, acc } from './stores';

    import { blur, draw } from 'svelte/transition';
    import { linear } from 'svelte/easing';

    const drw = (node, { delay, duration }) => draw(node, { delay, duration, easing: linear });

    export let math: boolean = false;
    const stroke = $opt.stroke;
    const sw = math ? 1 : $opt.swidth;
    const cw = math ? 1 : $opt.cwidth;
    // font size for marking coordinates
    $: fs = $opt.r / 25;
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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {$opt.size} {$opt.size}"
     width={$opt.size} height={$opt.size} fill="none"
     stroke-width={sw} {stroke}
     style="background-color:{$opt.background};">
    <!-- outer circle -->
    <path d="M{$opt.o} {$cds.ay} A{$opt.r} {$opt.r} 0 0 1 {$opt.o} {$cds.bx} A{$opt.r} {$opt.r} 0 1 1 {$opt.o} {$cds.ay}"
          stroke-width={cw} in:drw="{anime.circle}"></path>
    <!-- x axis -->
    <line x1={$cds.bx} y1={$opt.o} x2={$cds.ay} y2={$opt.o}
          in:drw="{anime.axis}"></line>
    <!-- y axis -->
    <line x1={$opt.o} y1={$cds.bx} x2={$opt.o} y2={$cds.ay}
          in:drw="{anime.axis}"></line>
    <!-- CD line -->
    <line x1={$cds.mx} y1={$cds.dy} x2={$cds.mx} y2={$cds.cy}
          in:drw="{anime.cdl}"></line>
    <!-- CD arc -->
    <path d="M{$cds.mx} {$cds.dy} A{$opt.r} {$opt.r} 0 0 1 {$cds.mx} {$cds.cy}"
          in:drw="{anime.cda}"></path>
    <!-- AM line -->
    <line x1={$cds.mx} y1={$opt.o} x2={$opt.o} y2={$cds.ay}
          in:drw="{anime.aml}"></line>
    <!-- OE arc -->
    <path d="M{$opt.o} {$opt.o} A{$opt.r2} {$opt.r2} 0 0 1 {$cds.nx} {$cds.ey}"
          in:drw="{anime.oea}"></path>
    <!-- OG arc -->
    <path d="M{$opt.o} {$opt.o} A{$opt.r} {$opt.r} 0 0 1 {$cds.cy} {$cds.gy}"
          in:drw="{anime.oga}"></path>
    <!-- EF arc -->
    <path d="M{$cds.nx} {$cds.ey} A{$cds.AF} {$cds.AF} 0 0 1 {$cds.fx} {$cds.fy}"
          in:drw="{anime.efa}"></path>

    {#if math}
        <!-- auxiliary lines at CB EN GP GO AF -->
        <path d="M{$cds.mx} {$cds.cy} L{$cds.bx} {$opt.o}
                 M{$cds.nx} {$cds.ey} V{$opt.o}
                 M{$cds.cy} {$opt.o} v{-$opt.r2}
                 L{$opt.o} {$opt.o}
                 m0 {-$opt.r} L{$cds.fx} {$cds.fy}"
              stroke-dasharray={$opt.r / 50}></path>
        <!-- right angles at M N O P -->
        <path d="M{$cds.mx} {$opt.o} {square}
                 M{$cds.nx} {$opt.o} {square}
                 M{$opt.o} {$opt.o} {square}
                 M{$cds.cy} {$opt.o} {square}"></path>
    {:else}
        <!-- FG arc ($opt.accent) -->
        <path d="M{$acc.x1} {$acc.y1}
                 A{$acc.r1} {$acc.r1} 0 0 1 {$acc.x2} {$acc.y2}
                 A{$acc.r2} {$acc.r2} 0 0 0 {$acc.x3} {$acc.y3}
                 A{$acc.r3} {$acc.r3} 0 0 0 {$acc.x4} {$acc.y4}
                 A{$acc.r4} {$acc.r4} 0 0 1 {$acc.x1} {$acc.y1}"
              fill={$opt.accent} stroke-width="0" in:blur={anime.fga}></path>
    {/if}
</svg>

{#if math}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {$opt.size} {$opt.size}"
         width={$opt.size} height={$opt.size} fill={$opt.stroke} font-size={fs}>
        <text x={$opt.o+fs} y={$cds.ay+fs}>A($opt.o,ay)</text>
        <text x={$cds.bx-fs*5} y={$opt.o-fs2}>B(bx,$opt.o)</text>
        <text x={$cds.mx+fs2} y={$cds.cy-fs2}>C(mx,cy)</text>
        <text x={$cds.mx} y={$cds.dy+fs}>D(mx,dy)</text>
        <text x={$cds.nx+fs2} y={$cds.ey-fs2}>E(nx,ey)</text>
        <text x={$cds.fx+fs2} y={$cds.fy+fs2}>F(fx,fy)</text>
        <text x={$cds.cy+fs2} y={$cds.gy}>G(cy,gy)</text>

        <text x={$cds.mx+fs2} y={$opt.o+fs}>M(mx,$opt.o)</text>
        <text x={$cds.nx+fs2} y={$opt.o+fs}>N(nx,$opt.o)</text>
        <text x={$opt.o+fs2} y={$opt.o+fs}>O($opt.o,$opt.o)</text>
        <text x={$cds.cy+fs2} y={$opt.o+fs}>P(cy,$opt.o)</text>
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
