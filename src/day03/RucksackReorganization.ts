import {Result, Solution} from "../types";

const lowerACharCode = "a".charCodeAt(0);
const upperACharCode = "A".charCodeAt(0);
const alphabetLength = 26;


function inBothCompartments(rucksack: string): string {
	const compartmentSize = rucksack.length / 2;
	const firstCompartment = rucksack.substring(0, compartmentSize);
	const secondCompartment = rucksack.substring(compartmentSize);
	return [...firstCompartment].find((item) => secondCompartment.includes(item)) ?? "";
}

function calculatePriority(item: string) {
	const code = item.charCodeAt(0);
	return 1 + (code >= lowerACharCode ? code - lowerACharCode : code - upperACharCode + alphabetLength);
}

function first(lines: string[]): number {
	return lines.reduce((acc, rucksack) => {
		return acc + calculatePriority(inBothCompartments(rucksack))
	}, 0);
}

function second(lines: string[]): number {
	let second = 0;
	while (lines.length >= 3) {
		const workingGroup = lines.splice(0, 3);
		const match = [...workingGroup[0]].find((item) => workingGroup[1].includes(item) && workingGroup[2].includes(item)) ?? "";
		second += calculatePriority(match);
	}
	return second;
}

export const day03: Solution = (input: string): Result => {
	const lines = input.split(/\r?\n/);
	return {first: first(lines), second: second(lines)}
}