<script lang="ts">
    import { blur, draw } from 'svelte/transition';
    import { linear } from 'svelte/easing';

    const drw = (node, { delay, duration }) => draw(node, { delay, duration, easing: linear });

    export let r: number;
    // stroke width
    export let swidth: number;
    // circle stroke width
    export let cwidth: number;
    // stroke color
    export let stroke: string;
    // accent color
    export let accent: string;
    // background color
    export let background: string;

    export let math: boolean;

    const sqrt5 = Math.sqrt(5);
    // font size for marking coordinates
    $: fs = r / 25;
    $: fs2 = fs / 2;

    $: r2 = r / 2;
    $: d = r * 2;

    $: size = cwidth + d;
    // center of the circle
    $: o = size / 2;

    // coordinates
    $: cds = (() => {
        const EN = r / sqrt5;
        const MC = r2 * Math.sqrt(3);

        return {
            ay: o - r,
            bx: o + r,

            mx: o + r2,
            cy: o - MC,
            dy: o + MC,

            nx: o + (r - EN) / 2,
            ey: o - EN,

            fx: o - r * Math.sqrt(10 - 2 * sqrt5) / 4,
            fy: o - r * (sqrt5 + 1) / 4,

            gy: o - r2,

            AF: r2 * (sqrt5 - 1),
        };
    })();

    // coordinates for the accent part
    $: acc = ((AF: number, s: number, c: number) => {
        function x(rc: number, y: number){
            /**
             * x^2 + y^2 = (r+c)^2
             * => x = sqrt((r+c-y) * (r+c+y))
             *
             * or
             *
             * x^2 + y^2 = (r+c)^2
             * => x = sqrt((r-c-y) * (r-c+y))
             */
            return Math.sqrt((rc - y) * (rc + y));
        }

        // radius of outer EF arc
        const r1 = AF + s;

        // y-coords on outer EF arc
        const c1 = r + (c - r1) * (c + r1) / d;
        const y1 = c1 - c;
        const y2 = c1 + c;

        // y-coords on inner OG arc
        const c2 = r2 + (c - s) * (c + s) / d + s;
        const y3 = c2 + c;
        const y4 = c2 - c;

        return {
            x1: o - x(r - c, y1), y1: o - y1, r1: r1,
            x2: o - x(r + c, y2), y2: o - y2, r2: r + c,
            x3: o - x(r + c, y3), y3: o - y3, r3: r - s,
            x4: o - x(r - c, y4), y4: o - y4, r4: r - c,
        };
    })(cds.AF, swidth / 2, cwidth / 2);

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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width={size} height={size} fill="none"
     stroke-width={swidth} {stroke}
     style="background-color:{background};">
    <!-- outer circle -->
    <path d="M{o} {cds.ay} A{r} {r} 0 0 1 {o} {cds.bx} A{r} {r} 0 1 1 {o} {cds.ay}"
          stroke-width={cwidth} in:drw="{anime.circle}"></path>
    <!-- x axis -->
    <line x1={cds.bx} y1={o} x2={cds.ay} y2={o}
          in:drw="{anime.axis}"></line>
    <!-- y axis -->
    <line x1={o} y1={cds.bx} x2={o} y2={cds.ay}
          in:drw="{anime.axis}"></line>
    <!-- CD line -->
    <line x1={cds.mx} y1={cds.dy} x2={cds.mx} y2={cds.cy}
          in:drw="{anime.cdl}"></line>
    <!-- CD arc -->
    <path d="M{cds.mx} {cds.dy} A{r} {r} 0 0 1 {cds.mx} {cds.cy}"
          in:drw="{anime.cda}"></path>
    <!-- AM line -->
    <line x1={cds.mx} y1={o} x2={o} y2={cds.ay}
          in:drw="{anime.aml}"></line>
    <!-- OE arc -->
    <path d="M{o} {o} A{r2} {r2} 0 0 1 {cds.nx} {cds.ey}"
          in:drw="{anime.oea}"></path>
    <!-- OG arc -->
    <path d="M{o} {o} A{r} {r} 0 0 1 {cds.cy} {cds.gy}"
          in:drw="{anime.oga}"></path>
    <!-- EF arc -->
    <path d="M{cds.nx} {cds.ey} A{cds.AF} {cds.AF} 0 0 1 {cds.fx} {cds.fy}"
          in:drw="{anime.efa}"></path>

    {#if math}
        <!-- auxiliary lines at CB EN GP GO AF -->
        <path d="M{cds.mx} {cds.cy} L{cds.bx} {o} M{cds.nx} {cds.ey} V{o} M{cds.cy} {o} v{-r2} L{o} {o} m0 {-r} L{cds.fx} {cds.fy}"
              stroke-dasharray={r / 50}></path>
        <!-- right angles at M N O P -->
        <path d="M{cds.mx} {o} {square} M{cds.nx} {o} {square} M{o} {o} {square} M{cds.cy} {o} {square}"></path>
    {:else}
        <!-- FG arc (accent) -->
        <path d="M{acc.x1} {acc.y1} A{acc.r1} {acc.r1} 0 0 1 {acc.x2} {acc.y2} A{acc.r2} {acc.r2} 0 0 0 {acc.x3} {acc.y3} A{acc.r3} {acc.r3} 0 0 0 {acc.x4} {acc.y4} A{acc.r4} {acc.r4} 0 0 1 {acc.x1} {acc.y1}"
              fill={accent} stroke-width="0" in:blur={anime.fga}></path>
    {/if}
</svg>

{#if math}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}"
         width={size} height={size} fill={stroke} font-size={fs}>
        <text x={o+fs} y={cds.ay+fs}>A(o,ay)</text>
        <text x={cds.bx-fs*5} y={o-fs2}>B(bx,o)</text>
        <text x={cds.mx+fs2} y={cds.cy-fs2}>C(mx,cy)</text>
        <text x={cds.mx} y={cds.dy+fs}>D(mx,dy)</text>
        <text x={cds.nx+fs2} y={cds.ey-fs2}>E(nx,ey)</text>
        <text x={cds.fx+fs2} y={cds.fy+fs2}>F(fx,fy)</text>
        <text x={cds.cy+fs2} y={cds.gy}>G(cy,gy)</text>

        <text x={cds.mx+fs2} y={o+fs}>M(mx,o)</text>
        <text x={cds.nx+fs2} y={o+fs}>N(nx,o)</text>
        <text x={o+fs2} y={o+fs}>O(o,o)</text>
        <text x={cds.cy+fs2} y={o+fs}>P(cy,o)</text>
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
