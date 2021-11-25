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

    // coordinates
    $: c = ((o: number, r: number, r2: number) => {
        let sqrt5 = Math.sqrt(5);
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
    })(o, r, r2);
    // coordinates for the accent part
    $: acc = ((AF: number, r: number, r2: number, s: number, c: number) => {
        function x(rb: number, y: number){
            return Math.sqrt((rb - y) * (rb + y));
        }

        let rr = r + r;

        let r1 = AF + s;
        let c1 = r + (c - r1) * (c + r1) / rr;
        let y1 = c1 - c;
        let y2 = c1 + c;

        let c2 = r2 + (c - s) * (c + s) / rr + s;
        let y3 = c2 + c;
        let y4 = c2 - c;

        return {
            x1: o - x(r - c, y1), y1: o - y1, r1: r1,
            x2: o - x(r + c, y2), y2: o - y2, r2: r + c,
            x3: o - x(r + c, y3), y3: o - y3, r3: r - s,
            x4: o - x(r - c, y4), y4: o - y4, r4: r - c,
        };
    })(c.AF, r, r2, swidth / 2, cwidth / 2);

    $: square = `m0 ${-fs} l${fs} 0 l0 ${fs}`;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width={size} height={size} fill="none"
     stroke-width={swidth} {stroke}
     style="background-color:{background};">
    <circle stroke-width={cwidth} cx={o} cy={o} r={r}></circle>
    <!-- x axis -->
    <line x1={o} y1={c.ay} x2={o} y2={c.bx}></line>
    <!-- y axis -->
    <line x1={c.ay} y1={o} x2={c.bx} y2={o}></line>
    <!-- CD line -->
    <line x1={c.mx} y1={c.cy} x2={c.mx} y2={c.dy}></line>
    <!-- AM line -->
    <line x1={o} y1={c.ay} x2={c.mx} y2={o}></line>
    <!-- CD arc -->
    <path d="M{c.mx} {c.dy} A{r} {r} 0 0 1 {c.mx} {c.cy}"></path>
    <!-- OE arc -->
    <path d="M{o} {o} A{r2} {r2} 0 0 1 {c.nx} {c.ey}"></path>
    <!-- EF arc -->
    <path d="M{c.nx} {c.ey} A{c.AF} {c.AF} 0 0 1 {c.fx} {c.fy}"></path>
    <!-- OG arc -->
    <path d="M{o} {o} A{r} {r} 0 0 1 {c.cy} {c.gy}"></path>

    {#if math}
        <!-- auxiliary lines at CB EN GP GO AF -->
        <path d="M{c.mx} {c.cy} L{c.bx} {o} M{c.nx} {c.ey} V{o} M{c.cy} {o} v{-r2} L{o} {o} m0 {-r} L{c.fx} {c.fy}"
              stroke-dasharray={r / 50}></path>
        <!-- right angles at M N O P -->
        <path d="M{c.mx} {o} {square} M{c.nx} {o} {square} M{o} {o} {square} M{c.cy} {o} {square}"></path>
    {:else}
        <!-- FG arc (accent) -->
        <path d="M{acc.x1} {acc.y1} A{acc.r1} {acc.r1} 0 0 1 {acc.x2} {acc.y2} A{acc.r2} {acc.r2} 0 0 0 {acc.x3} {acc.y3} A{acc.r3} {acc.r3} 0 0 0 {acc.x4} {acc.y4} A{acc.r4} {acc.r4} 0 0 1 {acc.x1} {acc.y1}"
              fill={accent} stroke-width="0"></path>
    {/if}
</svg>
{#if math}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}"
         width={size} height={size} fill={stroke} font-size={fs}>
        <text x={o+fs} y={c.ay+fs}>A(o,ay)</text>
        <text x={c.bx-fs*5} y={o-fs2}>B(bx,o)</text>
        <text x={c.mx+fs2} y={c.cy-fs2}>C(mx,cy)</text>
        <text x={c.mx} y={c.dy+fs}>D(mx,dy)</text>
        <text x={c.nx+fs2} y={c.ey-fs2}>E(nx,ey)</text>
        <text x={c.fx+fs2} y={c.fy+fs2}>F(fx,fy)</text>
        <text x={c.cy+fs2} y={c.gy}>G(cy,gy)</text>

        <text x={c.mx+fs2} y={o+fs}>M(mx,o)</text>
        <text x={c.nx+fs2} y={o+fs}>N(nx,o)</text>
        <text x={o+fs2} y={o+fs}>O(o,o)</text>
        <text x={c.cy+fs2} y={o+fs}>P(cy,o)</text>
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
