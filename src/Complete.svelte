<script lang="ts">
    export let radius: number;
    export let swidth: number;
    export let stroke: string;
    export let accent: string;
    export let background: string;

    $: size = (swidth + radius) * 2;
    $: o = size / 2;
    $: a = o - radius;
    $: b = o + radius;

    $: r2 = radius / 2;
    $: m = o + r2;
    $: MC = r2 * Math.sqrt(3);
    $: c = o - MC;
    $: d = o + MC;

    $: sqrt5 = Math.sqrt(5);
    $: EN = radius / sqrt5;
    $: ey = o - EN;
    $: ex = o + (radius - EN) / 2;

    $: AE = r2 * (sqrt5 - 1);
    $: fy = o - radius * (sqrt5 + 1) / 4;
    $: fx = o - radius * Math.sqrt(10 - 2 * sqrt5) / 4;

    $: g = o - r2;
</script>

<svg width={size} height={size} fill="none" stroke-width={swidth} {stroke}
     style="background-color:{background};">
    <circle stroke-width={swidth*2} cx={o} cy={o} r={radius}></circle>
    <!-- x axis -->
    <line x1={o} y1={a} x2={o} y2={b}></line>
    <!-- y axis -->
    <line x1={a} y1={o} x2={b} y2={o}></line>
    <!-- CD line -->
    <line x1={m} y1={c} x2={m} y2={d}></line>
    <!-- AM line -->
    <line x1={o} y1={a} x2={m} y2={o}></line>
    <!-- CD arc -->
    <path d="M {m} {d} A {radius} {radius} 0 0 1 {m} {c}"></path>
    <!-- OE arc -->
    <path d="M {o} {o} A {r2} {r2} 0 0 1 {ex} {ey}"></path>
    <!-- EF arc -->
    <path d="M {ex} {ey} A {AE} {AE} 0 0 1 {fx} {fy}"></path>
    <!-- OG arc -->
    <path d="M {o} {o} A {radius} {radius} 0 0 1 {c} {g}"></path>
    <!-- FG arc -->
    <path stroke-width={swidth*2} stroke={accent} d="M {c} {g} A {radius} {radius} 0 0 1 {fx} {fy}"></path>
</svg>

<style>
</style>
