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
export const transition = ((duration: number) => ({
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
}))(10000) as Transition;
