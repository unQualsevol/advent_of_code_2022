import {Result, Solution} from "../types";

interface Instruction {
	quantity: number,
	from: number,
	to: number,
}

type Crate = string;
type Stack = Crate[]

function getInitialState(stacksMap: string[]): Stack[] {
	const cratesCount = stacksMap.pop()?.match(/(\d+)/g)?.length ?? 0;
	const stacks: Stack[] = [];
	for (let i = 0; i < cratesCount; i++) {
		stacks.push([]);
	}
	while (stacksMap.length){
		const current = stacksMap.pop() ?? "";
		for (let i = 0; i < cratesCount; i++) {
			const position = 1 + 4*i;
			const crate = current.substring(position, position+1);
			if(crate.match(/\w/)) {
				stacks[i].push(crate);
			}
		}
	}
	return stacks;
}

function getInstructions(lines: string[]): Instruction[] {
	return lines.splice(-lines.length + 1).map((line) => {
		const values = line.match(/(\d+)/g)?.map((value) => Number(value)) ?? [0, 0, 0];
		return {
			quantity: values[0],
			from: values[1] - 1,
			to: values[2] - 1,
		}
	});
}

export const day05: Solution = (input: string): Result => {
	const lines = input.split(/\r?\n/);
	lines.pop();
	const stacksMap = lines.splice(0, lines.indexOf(""));
	const stacksFirst: Stack[] = getInitialState(stacksMap);
	const stacksSecond: Stack[] = JSON.parse(JSON.stringify(stacksFirst));
	const instructions: Instruction[] = getInstructions(lines);
	instructions.forEach(({quantity, from, to}) => {
		stacksFirst[to].push(...(stacksFirst[from].splice(-quantity).reverse()));
		stacksSecond[to].push(...(stacksSecond[from].splice(-quantity)));
	})
	const first = stacksFirst.map((stack) => stack.pop()).join("");
	const second = stacksSecond.map((stack) => stack.pop()).join("");
	return {first, second}
}