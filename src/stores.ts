import { writable, derived } from 'svelte/store';

import { sqrt5, init } from './constants';
import type Option from './Interfaces';

/**
 * option with some other common values
 */
export const option = ((opt: Option) => {
    const d = opt.r * 2;
    const size = opt.cwidth + d;

    return writable({
        ...opt,
        d,
        size,
        r2: opt.r / 2,
        o: size / 2,
    });
})(init);

/**
 * coordinates for the figure (and also length of AF (which is a radius))
 */
export const coords = derived(option, ({ r, r2, o }) => {
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

        fx: o - r * Math.sqrt((5 - sqrt5) / 8),
        fy: o - r * (sqrt5 + 1) / 4,

        gy: o - r2,

        AF: r2 * (sqrt5 - 1),
    };
});

/**
 * coordinates sophisticated for the 1/15 part of the perimeter (taking stroke-width into consideration)
 */
export const fifteenth = derived(option, ({ r, r2, o, d, swidth, cwidth }) => {
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

    let AF;
    coords.subscribe(cds => AF = cds.AF);
    const s = swidth / 2;
    const c = cwidth / 2;
    const rmc = r - c;
    const rpc = r + c;
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
        x1: o - x(rmc, y1), y1: o - y1, r1: r1,
        x2: o - x(rpc, y2), y2: o - y2, r2: rpc,
        x3: o - x(rpc, y3), y3: o - y3, r3: r - s,
        x4: o - x(rmc, y4), y4: o - y4, r4: rmc,
    };
});
