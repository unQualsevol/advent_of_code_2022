import {Result, Solution} from "../types";

function getMarkerPosition(input: string, length: number): number {
	for (let index = 0; index < input.length - length +1; index++) {
		const end = index+length;
		if(new Set(input.substring(index, end).split("")).size === length)
			return end;
	}
	return -1;
}

function first(input: string): number {
	return getMarkerPosition(input, 4);
}

function second(input: string): number {
	return getMarkerPosition(input, 14);
}

export const day06: Solution = (input: string): Result => {
	return {first: first(input), second: second(input)};
}