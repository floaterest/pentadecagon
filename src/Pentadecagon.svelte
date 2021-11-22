<script lang="ts">
    export let r: number;
    export let swidth: number;
    export let stroke: string;
    export let accent: string;
    export let background: string;
    $: s = swidth / 2;
    $: size = (swidth + r) * 2;
    $: o = size / 2;
    $: a = o - r;
    $: b = o + r;

    $: r2 = r / 2;
    $: m = o + r2;
    $: MC = r2 * Math.sqrt(3);
    $: c = o - MC;
    $: d = o + MC;

    $: sqrt5 = Math.sqrt(5);
    $: EN = r / sqrt5;
    $: ey = o - EN;
    $: ex = o + (r - EN) / 2;

    $: AE = r2 * (sqrt5 - 1);
    $: fy = o - r * (sqrt5 + 1) / 4;
    $: fx = o - r * Math.sqrt(10 - 2 * sqrt5) / 4;

    $: g = o - r2;

    $: y1 = (sqrt5 + 1) / 2 * (r2 - s) - s * s / r;
    $: x1 = Math.sqrt((r - s - y1) * (r - s + y1));

    $: y2 = (r * (sqrt5 + 1) / 2 - (sqrt5 - 3) * s) / 2 - s * s / r;
    $: x2 = Math.sqrt((r + s - y2) * (r + s + y2));
</script>

<svg width={size} height={size} fill="none" stroke-width={swidth} {stroke}
     style="background-color:{background};">
    <circle stroke-width={swidth} cx={o} cy={o} r={r}></circle>
    <!-- x axis -->
    <line x1={o} y1={a} x2={o} y2={b}></line>
    <!-- y axis -->
    <line x1={a} y1={o} x2={b} y2={o}></line>
    <!-- CD line -->
    <line x1={m} y1={c} x2={m} y2={d}></line>
    <!-- AM line -->
    <line x1={o} y1={a} x2={m} y2={o}></line>
    <!-- CD arc -->
    <path d="M {m} {d} A {r} {r} 0 0 1 {m} {c}"></path>
    <!-- OE arc -->
    <path d="M {o} {o} A {r2} {r2} 0 0 1 {ex} {ey}"></path>
    <!-- EF arc -->
    <path d="M {ex} {ey} A {AE} {AE} 0 0 1 {fx} {fy}"></path>
    <!-- OG arc -->
    <path d="M {o} {o} A {r} {r} 0 0 1 {c} {g}"></path>
    <!-- FG arc -->
    <path stroke-width={swidth} stroke={accent} d="M {c} {g} A {r} {r} 0 0 1 {fx} {fy}"></path>

    <path d="M {o-x1} {o-y1} A {AE} {AE} 0 0 1 {o-x2} {o-y2}" stroke="red" stroke-width="1"></path>
</svg>

<style>
</style>
