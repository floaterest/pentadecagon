<script lang="ts">
    export let r: number;
    export let swidth: number;
    export let scolor: string;
    export let accent: string;
    export let background: string;

    const size = (swidth + r) * 2;
    const o = size / 2;
    const a = o - r;
    const b = o + r;

    const r2 = r / 2;
    const m = o + r2;
    const MC = r2 * Math.sqrt(3);
    const c = o - MC;
    const d = o + MC;

    const sqrt5 = Math.sqrt(5);
    const EN = r / sqrt5;
    const ey = o - EN;
    const ex = o + (r - EN) / 2;

    const AE = r2 * (sqrt5 - 1);
    const fy = o - r * (sqrt5 + 1) / 4;
    const fx = o - r * Math.sqrt(10 - 2 * sqrt5) / 4;

    const g = o - r2;
</script>

<svg width={size} height={size} fill="none" stroke-width={swidth} stroke={scolor}
     style="background-color:{background};">
    <circle cx={o} cy={o} r={r} stroke-width={swidth*2}></circle>
    <line x1={o} y1={a} x2={o} y2={b}></line> <!-- x axis -->
    <line x1={a} y1={o} x2={b} y2={o}></line> <!-- y axis -->
    <line x1={m} y1={c} x2={m} y2={d}></line> <!-- CD line -->
    <line x1={o} y1={a} x2={m} y2={o}></line> <!-- AM line -->
    <path d="M {m} {d} A {r} {r} 0 0 1 {m} {c}"></path> <!-- CD arc -->
    <path d="M {o} {o} A {r2} {r2} 0 0 1 {ex} {ey}"></path> <!-- OE arc -->
    <path d="M {ex} {ey} A {AE} {AE} 0 0 1 {fx} {fy}"></path> <!-- EF arc -->
    <path d="M {o} {o} A {r} {r} 0 0 1 {c} {g}"></path> <!-- OG arc -->
    <path d="M {c} {g} A {r} {r} 0 0 1 {fx} {fy}" stroke={accent} stroke-width={swidth*2}></path> <!-- FG arc -->
</svg>

<style>
</style>
