interface Option{
    radius: number
    stroke: number
    foreground: string
    background: string
    accent: string
}

const option: Option = {
    radius: 1000,
    stroke: 20,
    foreground: 'white',
    background: 'black',
    accent: '#39c5bb',
};

const r = option.radius;
const size = (option.stroke + r) * 2;
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

svg(size, size).append([
    circle(o, o, r).addClass('bound'), // O circle
    line(o, a, o, b), // x axis
    line(a, o, b, o), // y axis
    arc(m, c, r, r, 0, m, d), // CD arc
    line(m, c, m, d), // CD line
    line(o, a, m, o), // AM line
    arc(o, o, r2, r2, 1, ex, ey), // OE arc
    arc(ex, ey, AE, AE, 1, fx, fy), // EF arc
    arc(o, o, r, r, 1, c, g), // OG arc
    arc(c, g, r, r, 1, fx, fy).addClass([ 'bound', 'accent' ]), // FG arc
]).appendTo(document.body);
