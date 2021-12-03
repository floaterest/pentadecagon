import type { DrawParams } from 'svelte/transition';

export interface Option{
    /**
     * radius of the circle (pixels)
     */
    r: number
    /**
     * stroke width (pixels)
     */
    swidth: number
    /**
     * circle stroke width (pixels)
     */
    cwidth: number
    /**
     * stroke color (same format as in css)
     */
    stroke: string
    /**
     * accent color (same format as in css)
     */
    accent: string
    /**
     * background color (same format as in css)
     */
    background: string
}

export interface Transition{
    /**
     * O circle
     */
    circle: DrawParams,
    /**
     * vertical axis
     */
    yaxis: DrawParams,
    /**
     * horizontal axis
     */
    xaxis: DrawParams,
    /**
     * CD line
     */
    cdl: DrawParams,
    /**
     * CD arc
     */
    cda: DrawParams,
    /**
     * AM line
     */
    aml: DrawParams,
    /**
     * OE arc
     */
    oea: DrawParams,
    /**
     * OG arc
     */
    oga: DrawParams,
    /**
     * EF arc
     */
    efa: DrawParams,
    /**
     * FG arc (accent)
     */
    fga: DrawParams,
}
