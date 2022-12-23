import {Result, Solution} from "../types";

function findClosingBracketIndex(value: string): number {
	let openBracketCount = 0
	let index = 0;
	do {
		const current = value.slice(index, ++index);
		switch (current) {
			case "[": {
				openBracketCount++;
				break;
			}
			case "]": {
				openBracketCount--;
				break;
			}
		}
	} while (openBracketCount)
	return index;
}

function readList(value: string): {value: string, index: number} {
	const finalIndex = findClosingBracketIndex(value);
	return {value: value.slice(0, finalIndex), index: finalIndex};
}

const isTenRegex = /^10/
function readNumber(value: string) {
	if(isTenRegex.test(value)) {
		return {value: 10, index: 2}
	}
	return {index: 1, value: Number(value.slice(0, 1))};
}

function readElement(value: string): { value: number | string, index: number} {
	if(value.startsWith("[")) {
		return readList(value);
	}
	return readNumber(value);
}

function readElements(s: string): (string|number)[] {
	let index = 0;
	const elements: (string|number)[] = [];
	while (index<s.length){
		const {value, index: newIndex} = readElement(s.slice(index));
		elements.push(value);
		index+=newIndex+1
	}
	return elements;
}

function compare(firstString: string, secondString: string): number {
	const readElements1 = readElements(firstString);
	const readElements2 = readElements(secondString);
	let index = 0;
	while (index < readElements1.length && index < readElements2.length){
		const current1 = readElements1[index];
		const current2 = readElements2[index];
		let diff;
		if(typeof current1 === "number" && typeof current2 === "number") {
			diff = current2 - current1;
		} else if(typeof current1 === "string" && typeof current2 === "string") {
			diff = compare(current1.slice(1,-1), current2.slice(1,-1));
		} else if(typeof current1 === "number" && typeof current2 === "string") {
			diff = compare(""+current1, current2.slice(1,-1))
		} else if(typeof current1 === "string" && typeof current2 === "number") {
			diff = compare(current1.slice(1,-1), ""+current2)
		}
		if(diff) {
			return diff;
		}
		index++;
	}

	if (index === readElements1.length && index < readElements2.length) {
		return 1;
	}

	if (index === readElements2.length && index < readElements1.length) {
		return -1;
	}
	return 0;
}

function first(blocks: string[]) {
	let first = 0;
	blocks.map((block)=> block.split(/\n/)).forEach(([firstString, secondString], index) => {
		if (compare(firstString, secondString) >= 0) {
			first += index + 1;
		}
	});
	return first;
}

function second(blocks:string[]) {
	const lines = blocks.map((block)=> block.split(/\n/)).flat();
	const firstDivider = "[[2]]";
	const secondDivider = "[[6]]";
	lines.push(firstDivider);
	lines.push(secondDivider);
	lines.sort((a, b) => -compare(a, b))
	const firstDividerIndex = lines.indexOf(firstDivider)+1;
	const secondDividerIndex = lines.indexOf(secondDivider)+1;
	return firstDividerIndex*secondDividerIndex;
}

export const day13: Solution = (input: string): Result => {
	const blocks = input.split(/\n\n/);
	return {first: first(blocks), second: second(blocks)};
}