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

    $: size = cwidth + r * 2;
    $: o = size / 2;
    $: r2 = r / 2;

    // coordinates
    $: cds = ((o: number, r: number, r2: number) => {
        let sqrt5 = Math.sqrt(5);
        let EN = r / sqrt5;
        let MC = r2 * Math.sqrt(3);

        return {
            a: o - r,
            b: o + r,

            mx: o + r2,
            cy: o - MC,
            dy: o + MC,

            ey: o - EN,
            ex: o + (r - EN) / 2,

            fy: o - r * (sqrt5 + 1) / 4,
            fx: o - r * Math.sqrt(10 - 2 * sqrt5) / 4,

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
    })(cds.AF, r, r2, swidth / 2, cwidth / 2);

</script>

<svg width={size} height={size} fill="none" stroke-width={swidth} {stroke}
     style="background-color:{background};">
    <circle stroke-width={cwidth} cx={o} cy={o} r={r}></circle>
    <!-- x axis -->
    <line x1={o} y1={cds.a} x2={o} y2={cds.b}></line>
    <!-- y axis -->
    <line x1={cds.a} y1={o} x2={cds.b} y2={o}></line>
    <!-- CD line -->
    <line x1={cds.mx} y1={cds.cy} x2={cds.mx} y2={cds.dy}></line>
    <!-- AM line -->
    <line x1={o} y1={cds.a} x2={cds.mx} y2={o}></line>
    <!-- CD arc -->
    <path d="M {cds.mx} {cds.dy} A {r} {r} 0 0 1 {cds.mx} {cds.cy}"></path>
    <!-- OE arc -->
    <path d="M {o} {o} A {r2} {r2} 0 0 1 {cds.ex} {cds.ey}"></path>
    <!-- EF arc -->
    <path d="M {cds.ex} {cds.ey} A {cds.AF} {cds.AF} 0 0 1 {cds.fx} {cds.fy}"></path>
    <!-- OG arc -->
    <path d="M {o} {o} A {r} {r} 0 0 1 {cds.cy} {o - r2}"></path>
    <!-- FG arc (accent) -->
    <path d="M {acc.x1} {acc.y1} A {acc.r1} {acc.r1} 0 0 1 {acc.x2} {acc.y2} A {acc.r2} {acc.r2} 0 0 0 {acc.x3} {acc.y3} A {acc.r3} {acc.r3} 0 0 0 {acc.x4} {acc.y4} A {acc.r4} {acc.r4} 0 0 1 {acc.x1} {acc.y1}"
          fill={accent} stroke-width="0"></path>
</svg>
