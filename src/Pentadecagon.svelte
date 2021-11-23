<script lang="ts">
    export let r: number;
    export let swidth: number;
    export let bwidth: number;
    export let stroke: string;
    export let accent: string;
    export let background: string;

    $: size = bwidth + r * 2;
    $: o = size / 2;
    $: a = o - r;
    $: bb = o + r;

    $: rhalf = r / 2;
    $: m = o + rhalf;
    $: MC = rhalf * Math.sqrt(3);
    $: c = o - MC;
    $: d = o + MC;

    $: sqrt5 = Math.sqrt(5);
    $: EN = r / sqrt5;
    $: ey = o - EN;
    $: ex = o + (r - EN) / 2;

    $: AE = rhalf * (sqrt5 - 1);
    $: fy = o - r * (sqrt5 + 1) / 4;
    $: fx = o - r * Math.sqrt(10 - 2 * sqrt5) / 4;

    $: g = o - rhalf;

    function x(rb: number, y: number){
        return Math.sqrt((rb - y) * (rb + y));
    }

    $:p = (() => {
        let s = swidth / 2;
        let b = bwidth / 2;
        let r2 = r + r;

        let r1 = AE + s;
        let y1 = r + (b - r1) * (b + r1) / r2 - b;

        // let y1 = (sqrt5 * (r2 - s) + r2 + s) / 2 + bs2r - b;
        let y2 = y1 + bwidth;

        let y3 = rhalf + (b - s) * (b + s) / r2 + s + b;
        let y4 = y3 - bwidth;

        return {
            x1: o - x(r - b, y1), y1: o - y1, r1: r1,
            x2: o - x(r + b, y2), y2: o - y2, r2: r + b,
            x3: o - x(r + b, y3), y3: o - y3, r3: r - s,
            x4: o - x(r - b, y4), y4: o - y4, r4: r - b,
        };
    })();

</script>

<svg width={size} height={size} fill="none" stroke-width={swidth} {stroke}
     style="background-color:{background};">
    <circle stroke-width={bwidth} cx={o} cy={o} r={r}></circle>
    <!-- x axis -->
    <line x1={o} y1={a} x2={o} y2={bb}></line>
    <!-- y axis -->
    <line x1={a} y1={o} x2={bb} y2={o}></line>
    <!-- CD line -->
    <line x1={m} y1={c} x2={m} y2={d}></line>
    <!-- AM line -->
    <line x1={o} y1={a} x2={m} y2={o}></line>
    <!-- CD arc -->
    <path d="M {m} {d} A {r} {r} 0 0 1 {m} {c}"></path>
    <!-- OE arc -->
    <path d="M {o} {o} A {rhalf} {rhalf} 0 0 1 {ex} {ey}"></path>
    <!-- EF arc -->
    <path d="M {ex} {ey} A {AE} {AE} 0 0 1 {fx} {fy}"></path>
    <!-- OG arc -->
    <path d="M {o} {o} A {r} {r} 0 0 1 {c} {g}"></path>
    <!-- FG arc -->
    <path d="M {p.x1} {p.y1} A {p.r1} {p.r1} 0 0 1 {p.x2} {p.y2} A {p.r2} {p.r2} 0 0 0 {p.x3} {p.y3} A {p.r3} {p.r3} 0 0 0 {p.x4} {p.y4} A {p.r4} {p.r4} 0 0 1 {p.x1} {p.y1}"
          fill={accent} stroke-width="0"></path>
</svg>

<style>
</style>
