import { writable, derived, Writable } from 'svelte/store';

import type Option from './Option';

const sqrt5 = Math.sqrt(5);

const def: Option = {
    r: 500,
    swidth: 20,
    cwidth: 40,
    stroke: 'white',
    accent: '#39c5bb',
    background: 'black',
};

export const opt = ((opt: Option) => {
    const d = opt.r * 2;
    const size = opt.cwidth + d;
    console.log('compute opt');
    return writable({
        ...opt,
        d,
        size,

        r2: opt.r / 2,
        o: size / 2,
    });
})(def);

export const cds = derived(opt, ({ r, r2, o }) => {
    console.log('compute cds');

    const EN = r / sqrt5;
    const MC = r2 * Math.sqrt(3);

    return {
        ay: o - r,
        bx: o + r,

        mx: o + r2,
        cy: o - MC,
        dy: o + MC,

        nx: o + (r - EN) / 2,
        ey: o - EN,

        fx: o - r * Math.sqrt(10 - 2 * sqrt5) / 4,
        fy: o - r * (sqrt5 + 1) / 4,

        gy: o - r2,

        AF: r2 * (sqrt5 - 1),
    };
});

export const acc = derived(opt, ({ r, r2, o, d, swidth, cwidth }) => {
    function x(rc: number, y: number){
        /**
         * x^2 + y^2 = (r+c)^2 => x = sqrt((r+c-y) * (r+c+y))
         *
         * or
         *
         * x^2 + y^2 = (r+c)^2 => x = sqrt((r-c-y) * (r-c+y))
         */
        return Math.sqrt((rc - y) * (rc + y));
    }

    console.log('compute acc');
    let AF;
    cds.subscribe(v => AF = v.AF);
    const s = swidth / 2;
    const c = cwidth / 2;
    // radius of outer EF arc
    const r1 = AF + s;

    // y-coords on outer EF arc
    const c1 = r + (c - r1) * (c + r1) / d;
    const y1 = c1 - c;
    const y2 = c1 + c;

    // y-coords on inner OG arc
    const c2 = r2 + (c - s) * (c + s) / d + s;
    const y3 = c2 + c;
    const y4 = c2 - c;

    return {
        x1: o - x(r - c, y1), y1: o - y1, r1: r1,
        x2: o - x(r + c, y2), y2: o - y2, r2: r + c,
        x3: o - x(r + c, y3), y3: o - y3, r3: r - s,
        x4: o - x(r - c, y4), y4: o - y4, r4: r - c,
    };
});
