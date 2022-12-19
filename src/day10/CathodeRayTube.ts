import {Result, Solution} from "../types";

const addXRegex = /addx (-?\d+)/

const interestingSignalStrengths = [20, 60, 100, 140, 180, 220];
const crtWidth = 40;
const crtLineRegex = new RegExp(`.{1,${crtWidth}}`, "g");

function calculateSignalStrength(xHistory: number[], indexes: number[]): number {
	return indexes.reduce((acc, index) => acc + xHistory[index-1] * index, 0);
}

function runCRT(xHistory: number[]): string {
	return xHistory.map((current, index) => {
		const currentIndex = index % crtWidth;
		return current < currentIndex-1 || current > currentIndex+1 ? "." : "#";
	}).join("").match(crtLineRegex)?.join("\n") as string
}

export const day10: Solution = (input: string): Result => {
	const lines = input.split(/\r?\n/);
	let x = 1;
	const xHistory: number[] = [1];
	for (let i = 0; i < lines.length; i++) {
		xHistory.push(x);
		const instruction = lines[i].match(addXRegex);
		if(instruction) {
			x += Number(instruction[1]);
			xHistory.push(x);
		}
	}
	xHistory.pop();
	const first = calculateSignalStrength(xHistory, interestingSignalStrengths);
	const second = "\n"+runCRT(xHistory)+"\n";
	return {first: first, second: second};
}