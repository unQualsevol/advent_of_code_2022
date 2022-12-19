import {Result, Solution} from "../types";

interface Operation {
	operation: "*" | "+";
	operand: number | "old";
}

interface Monkey {
	itemsInspected: number;
	items: number[];
	testValue: number;
	whenTrue: number;
	whenFalse: number;
	operation: Operation;
}

const itemsRegex = /(\d+)/g
function readStartingItems(monkeyBlock: string[]): number[] {
	return monkeyBlock[1].match(itemsRegex)?.map((value) => Number(value)) ?? [];
}

const operationRegex = /([+*]) (\d+|old)$/
function readOperation(monkeyBlock: string[]): Operation {
	const [, operation, operandValue] = monkeyBlock[2].match(operationRegex) as string[];
	const operand = operandValue === "old" ? operandValue : Number(operandValue);
	return {operation: operation as "*"|"+", operand: operand}
}

function getValueAtTheEnd(line: string): number {
	return Number(line.match(valueAtTheEndRegex)?.[0]);
}

const valueAtTheEndRegex = /\d+$/g
function readTestValue(monkeyBlock: string[]): number {
	return Number(getValueAtTheEnd(monkeyBlock[3]));
}
function readWhenTrue(monkeyBlock: string[]): number {
	return getValueAtTheEnd(monkeyBlock[4]);
}
function readWhenFalse(monkeyBlock: string[]): number {
	return getValueAtTheEnd(monkeyBlock[5]);
}

function readMonkeys(lines: string[]) {
	const monkeys: Monkey[] = [];
	while (lines.length) {
		const monkeyBlock = lines.splice(0, 6);
		const startingItems = readStartingItems(monkeyBlock) ?? [];
		const operation = readOperation(monkeyBlock);
		const testValue = readTestValue(monkeyBlock);
		const whenTrue = readWhenTrue(monkeyBlock);
		const whenFalse = readWhenFalse(monkeyBlock);
		monkeys.push({
			itemsInspected: 0,
			items: startingItems,
			testValue: testValue,
			whenTrue: whenTrue,
			whenFalse: whenFalse,
			operation: operation,
		})
	}
	return monkeys;
}

function calculateNewItemWorry(item: number, operation: Operation, reduceWorryFn:(value: number)=> number): number {
	const firstOperand = item;
	const secondOperand = operation.operand === "old" ? item : operation.operand;
	let value;
	switch (operation.operation) {
		case "+": {
			value = firstOperand+secondOperand;
			break;
		}
		case "*": {
			value = firstOperand*secondOperand;
			break;
		}
	}
	return reduceWorryFn(value);
}

function playRound(monkeys: Monkey[], reduceWorryFn: (value: number)=> number) {
	for (let i = 0; i < monkeys.length; i++) {
		const monkey = monkeys[i];
		while (monkey.items.length) {
			const item = monkey.items.splice(0,1);
			monkey.itemsInspected++;
			const newItemValue = calculateNewItemWorry(item[0], monkey.operation, reduceWorryFn);
			const destinationMonkey = newItemValue % monkey.testValue === Number(0)? monkey.whenTrue : monkey.whenFalse;
			monkeys[destinationMonkey].items.push(newItemValue);
		}
	}
}

function calculateMonkeyBusiness(monkeys: Monkey[]): number {
	return monkeys.map((monkey)=> monkey.itemsInspected)
		.sort((a,b)=> b-a)
		.splice(0,2)
		.reduce((acc, current)=> acc*current,1);
}

function executeGame(monkeys:Monkey[], rounds: number, reduceWorryFn: (value: number)=> number): number {
	for (let i = 0; i < rounds; i++) {
		playRound(monkeys, reduceWorryFn)
	}
	return calculateMonkeyBusiness(monkeys);
}

function first(monkeys:Monkey[]): number {
	return executeGame(monkeys, 20, (value) => Math.floor(value/3));
}

function second(monkeys:Monkey[]): number {
	const allDivisors = monkeys.reduce((acc, monkey)=> acc*monkey.testValue,1);
	return executeGame(monkeys, 10000, (value) => value%allDivisors);
}

export const day11: Solution = (input: string): Result => {
	const lines = input.split(/\r?\n/).filter((line) => line);
	return {first: first(readMonkeys([...lines])), second: second(readMonkeys([...lines]))};
}