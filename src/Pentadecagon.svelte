<script lang="ts">
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

    export let math: boolean = false;
    $: fs = r / 25;
    $: fs2 = fs / 2;

    $: size = cwidth + r * 2;
    $: o = size / 2;
    $: r2 = r / 2;
    const sqrt5 = Math.sqrt(5);

    // coordinates
    $: cds = ((o: number, r: number, r2: number, sqrt5) => {
        let EN = r / sqrt5;
        let MC = r2 * Math.sqrt(3);
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
    })(o, r, r2, sqrt5);
    // coordinates for the accent part
    $: acc = ((AF: number, r: number, r2: number, s: number, c: number) => {
        function x(rb: number, y: number){
            return Math.sqrt((rb - y) * (rb + y));
        }

        let d = r + r;

        let r1 = AF + s;
        let c1 = r + (c - r1) * (c + r1) / d;
        let y1 = c1 - c;
        let y2 = c1 + c;

        let c2 = r2 + (c - s) * (c + s) / d + s;
        let y3 = c2 + c;
        let y4 = c2 - c;

        return {
            x1: o - x(r - c, y1), y1: o - y1, r1: r1,
            x2: o - x(r + c, y2), y2: o - y2, r2: r + c,
            x3: o - x(r + c, y3), y3: o - y3, r3: r - s,
            x4: o - x(r - c, y4), y4: o - y4, r4: r - c,
        };
    })(cds.AF, r, r2, swidth / 2, cwidth / 2);

    $: square = `m0 ${-fs} l${fs} 0 l0 ${fs}`;
    let duration = 10000;

    const draw = (_, { duration, delay, length } = { delay: 0 }) => ({
        duration,
        delay,
        css: t => `
            stroke-dasharray: ${length};
            stroke-dashoffset: ${~~(length * (1 - t))};
        `,
    });

    $: anime = (() => {
        let p = r * 2 * Math.PI;
        return {
            circle: {
                duration,
                length: p,
            },
            axis: {
                duration: duration / 2,
                delay: duration / 2,
                length: cds.cy + cds.dy,
            },
            cdl: {
                duration: duration / 3,
                delay: duration * 5 / 12,
                length: cds.dy - cds.cy,
            },
            cda: {
                duration: duration / 3,
                delay: duration * 5 / 12,
                length: p / 3,
            },
            aml: {
                duration: duration / 6,
                delay: duration * 7 / 12,
                length: r2 * sqrt5,
            },
            oea: {
                duration: duration / 12,
                delay: duration * 3 / 4,
                length: p / 12,
            },
        };
    })();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width={size} height={size} fill="none"
     stroke-width={swidth} {stroke}
     style="background-color:{background};">
    <!-- outer circle -->
    <path d="M{o} {cds.ay} A{r} {r} 0 0 1 {o} {cds.bx} A{r} {r} 0 1 1 {o} {cds.ay}"
          stroke-width={cwidth} transition:draw={anime.circle}></path>
    <!-- x axis -->
    <line x1={cds.bx} y1={o} x2={cds.ay} y2={o}
          transition:draw={anime.axis}></line>
    <!-- y axis -->
    <line x1={o} y1={cds.bx} x2={o} y2={cds.ay}
          transition:draw={anime.axis}></line>
    <!-- CD line -->
    <line x1={cds.mx} y1={cds.dy} x2={cds.mx} y2={cds.cy}
          transition:draw={anime.cdl}></line>
    <!-- CD arc -->
    <path d="M{cds.mx} {cds.dy} A{r} {r} 0 0 1 {cds.mx} {cds.cy}"
          transition:draw={anime.cda}></path>
    <!-- AM line -->
    <line x1={cds.mx} y1={o} x2={o} y2={cds.ay}
          transition:draw={anime.aml}></line>
    <!-- OE arc -->
    <path d="M{o} {o} A{r2} {r2} 0 0 1 {cds.nx} {cds.ey}"
          transition:draw={anime.oea}></path>
    <!-- EF arc -->
    <path d="M{cds.nx} {cds.ey} A{cds.AF} {cds.AF} 0 0 1 {cds.fx} {cds.fy}"></path>
    <!-- OG arc -->
    <path d="M{o} {o} A{r} {r} 0 0 1 {cds.cy} {cds.gy}"></path>

    {#if math}
        <!-- auxiliary lines at CB EN GP GO AF -->
        <path d="M{cds.mx} {cds.cy} L{cds.bx} {o} M{cds.nx} {cds.ey} V{o} M{cds.cy} {o} v{-r2} L{o} {o} m0 {-r} L{cds.fx} {cds.fy}"
              stroke-dasharray={r / 50}></path>
        <!-- right angles at M N O P -->
        <path d="M{cds.mx} {o} {square} M{cds.nx} {o} {square} M{o} {o} {square} M{cds.cy} {o} {square}"></path>
    {:else}
        <!-- FG arc (accent) -->
        <path d="M{acc.x1} {acc.y1} A{acc.r1} {acc.r1} 0 0 1 {acc.x2} {acc.y2} A{acc.r2} {acc.r2} 0 0 0 {acc.x3} {acc.y3} A{acc.r3} {acc.r3} 0 0 0 {acc.x4} {acc.y4} A{acc.r4} {acc.r4} 0 0 1 {acc.x1} {acc.y1}"
              fill={accent} stroke-width="0"></path>
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
