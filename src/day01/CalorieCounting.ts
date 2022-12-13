import {Result, Solution} from "../types";

export const day01: Solution = (input: string): Result => {
	const elfCalories = input
		.split(/\r?\n/)
		.reduce((acc, line) => {
			if (!line) {
				acc.push(0);
				return acc;
			}
			const calories = Number(line);
			const current = acc.pop() ?? 0;
			acc.push(current + calories);
			return acc;
		}, [] as number[])
		.sort()
		.reverse();
	return {first: elfCalories[0], second: elfCalories.slice(0, 3).reduce((acc, current) => acc + current, 0)};
}