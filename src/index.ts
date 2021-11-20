interface Option{
    radius: number
    stroke: number
    foreground: string
    background: string
    accent: string
}

const option: Option = {
    radius: 500,
    stroke: 10,
    foreground: 'white',
    background: 'black',
    accent: '#39c5bb',
};

//#region math

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
//#endregion math

svg(size, size).append([
    circle(o, o, r).addClass('bound'), // O circle
    line(o, a, o, b), // x axis
    line(a, o, b, o), // y axis
    arc(r, m, d, m, c), // CD arc
    line(m, c, m, d), // CD line
    line(o, a, m, o), // AM line
    arc(r2, o, o, ex, ey), // OE arc
    arc(AE, ex, ey, fx, fy), // EF arc
    arc(r, o, o, c, g), // OG arc
    arc(r, c, g, fx, fy).addClass([ 'bound', 'accent' ]), // FG arc
]).attr('id', 'pfp').appendTo(document.body);
