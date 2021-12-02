<script lang="ts">
    import { option, coords } from './stores';

    const { r, size, r2, o, stroke } = $option;

    // font size for marking coordinates
    $: fs = r / 25;
    $: fs2 = fs / 2;
    $: square = `m0 ${-fs} l${fs} 0 l0 ${fs}`;
</script>
<svg width={size} height={size} {stroke}>
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
</svg>

<svg width={size} height={size} fill={stroke} font-size={fs}>
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
    text{
        font-family: "Courier", sans-serif;
    }

    path{
        stroke-width: 1px;
        fill: none;
    }
</style>
