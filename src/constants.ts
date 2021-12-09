import type { Option, Transition } from './Interfaces';

export const sqrt5 = Math.sqrt(5);

/**
 * initial option
 */
export const init: Option = {
    r: 500,
    swidth: 20,
    cwidth: 40,
    stroke: 'white',
    accent: '#39c5bb',
    background: 'black',
};

/**
 * array of transitions
 */
export const transitions = ((duration: number) => [
    {
        circle: {
            duration,
        },
        xaxis: {
            duration: duration / 2,
            delay: duration / 2,
        },
        yaxis: {
            duration: duration / 2,
            delay: duration / 2,
        },
        cdl: {
            duration: duration / 3,
            delay: duration * 5 / 12,
        },
        cda: {
            duration: duration / 3,
            delay: duration * 5 / 12,
        },
        aml: {
            duration: duration / 6,
            delay: duration * 7 / 12,
        },
        oea: {
            duration: duration / 12,
            delay: duration * 3 / 4,
        },
        oga: {
            duration: duration / 12,
            delay: duration * 3 / 4,
        },
        efa: {
            duration: duration / 15,
            delay: duration * 5 / 6,
        },
        fga: {
            duration: duration / 10,
            delay: duration * 9 / 10,
        },
    },
    {
        circle: {
            duration,
        },
        yaxis: {
            delay: duration / 2,
            duration: duration / 2,
        },
        xaxis: {
            delay: duration / 4,
            duration: duration / 2,
        },
        cdl: {
            delay: duration * 5 / 12,
            duration: duration / 3,
        },
        cda: {
            delay: duration * 5 / 12,
            duration: duration / 3,
        },
        aml: {
            delay: duration * 7 / 12,
            duration: duration * sqrt5 / 12,
        },
        oea: {
            delay: duration * 7 / 12,
            duration: duration / 12,
        },
        oga: {
            delay: duration * 2 / 3,
            duration: duration / 6,
        },
        efa: {
            delay: duration * 2 / 3,
            duration: duration * 7 / 30,
        },
        fga: {
            delay: duration * 9 / 10,
            duration: duration / 10,
        },
    },
])(10000) as Transition[];
