"use strict";
var option = {
    radius: 1000,
    stroke: 20,
    foreground: 'white',
    background: 'black',
    accent: '#39c5bb',
};
var r = option.radius;
var size = (option.stroke + r) * 2;
var o = size / 2;
var a = o - r;
var b = o + r;
var r2 = r / 2;
var m = o + r / 2;
var MC = r * Math.sin(Math.PI / 3);
var c = o - MC;
var d = o + MC;
var sqrt5 = Math.sqrt(5);
var EN = r / sqrt5;
var ey = o - EN;
var ex = o + (r - EN) / 2;
var AE = r * (sqrt5 - 1) / 2;
var fy = o - r * (sqrt5 + 1) / 4;
var fx = o - r * Math.sqrt(10 - 2 * sqrt5) / 4;
var g = o - r / 2;
svg(size, size).append([
    circle(o, o, r).addClass('bound'),
    line(o, a, o, b),
    line(a, o, b, o),
    arc(m, c, r, r, 0, m, d),
    line(m, c, m, d),
    line(o, a, m, o),
    arc(o, o, r2, r2, 1, ex, ey),
    arc(c, g, r, r, 1, fx, fy).addClass(['bound', 'accent']),
    arc(ex, ey, AE, AE, 1, fx, fy),
    arc(o, o, r, r, 1, c, g), // arc 2
]).appendTo(document.body);
//# sourceMappingURL=index.js.map