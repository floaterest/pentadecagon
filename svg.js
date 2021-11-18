"use strict";
var ns = 'http://www.w3.org/2000/svg';
function svg(w, h) {
    return $(document.createElementNS(ns, 'svg')).attr({
        width: w,
        height: h,
    });
}
function circle(cx, cy, r) {
    return $(document.createElementNS(ns, 'circle')).attr({
        cx: cx,
        cy: cy,
        r: r,
    });
}
function line(x1, y1, x2, y2) {
    return $(document.createElementNS(ns, 'line')).attr({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
    });
}
function arc(x1, y1, rx, ry, sweep, x, y) {
    return $(document.createElementNS(ns, 'path')).attr({
        d: "M " + x1 + " " + y1 + " A " + rx + " " + ry + " 0 0 " + sweep + " " + x + " " + y,
    });
}
//# sourceMappingURL=svg.js.map