import {Result, Solution} from "../types";

interface Coordinate {
	x: number;
	y: number;
}

type Direction = "L" | "R" | "U" | "D";

interface Instruction {
	steps: number;
	direction: Direction;
}

const instructionRegex = /(\w) (\d+)/;

function toString(c:Coordinate): string {
	return `${c.x}_${c.y}`
}

function moveHead(head: Coordinate, direction: Direction, offset: number): Coordinate {
	switch (direction) {
		case "L": return {x: head.x-offset, y: head.y};
		case "R": return {x: head.x+offset, y: head.y};
		case "U": return {x: head.x, y: head.y+offset};
		case "D": return {x: head.x, y: head.y-offset};
	}
	return head;
}

function moveTail(tail: Coordinate, head: Coordinate): Coordinate {
	const distanceX = head.x - tail.x;
	const distanceY = head.y - tail.y;
	if(Math.max(Math.abs(distanceX), Math.abs(distanceY)) < 2) return tail;
	if(distanceX < 0 && distanceY > 0) return {x: tail.x-1, y: tail.y+1};
	if(distanceX < 0 && distanceY === 0) return {x: tail.x-1, y: tail.y};
	if(distanceX < 0 && distanceY < 0) return {x: tail.x-1, y: tail.y-1};

	if(distanceX > 0 && distanceY > 0) return {x: tail.x+1, y: tail.y+1};
	if(distanceX > 0 && distanceY === 0) return {x: tail.x+1, y: tail.y};
	if(distanceX > 0 && distanceY < 0) return {x: tail.x+1, y: tail.y-1};

	if(distanceY < 0 && distanceX > 0) return {x: tail.x+1, y: tail.y-1};
	if(distanceY < 0 && distanceX === 0) return {x: tail.x, y: tail.y-1};
	if(distanceY < 0 && distanceX < 0) return {x: tail.x-1, y: tail.y-1};

	if(distanceY > 0 && distanceX > 0) return {x: tail.x+1, y: tail.y+1};
	if(distanceY > 0 && distanceX === 0) return {x: tail.x, y: tail.y+1};
	if(distanceY > 0 && distanceX < 0) return {x: tail.x-1, y: tail.y+1};

	return tail;
}

function calculate(instructions: Instruction[], numberOfKnots: number) {
	let head:Coordinate = {x:0, y:0};
	const numberOfExtraKnots = numberOfKnots-2;
	const extraKnots: Coordinate[] = [];
	for (let i = 0; i < numberOfExtraKnots; i++) extraKnots.push({x:0, y:0});
	let tail:Coordinate = {x:0, y:0};

	const whereTailHasBeen: Set<string> = new Set<string>();
	whereTailHasBeen.add(toString(tail));
	instructions.forEach((instruction) => {
		const {direction, steps} = instruction;
		for (let i = 0; i < steps; i++) {
			head = moveHead(head, direction, 1);
			let previous = head;
			for (let j = 0; j < numberOfKnots; j++) {
				extraKnots[j] = moveTail(extraKnots[j], previous)
				previous = extraKnots[j];
			}
			tail = moveTail(tail, previous)
			whereTailHasBeen.add(toString(tail));
		}
	});
	return whereTailHasBeen.size;
}

export const day09: Solution = (input: string): Result => {
	const instructions = input.split(/\r?\n/).map((line) => {
		const matchResult = line.match(instructionRegex)
		return {direction: matchResult?.[1] as Direction, steps: Number(matchResult?.[2])};
	});
	const first = calculate(instructions, 2);
	const second = calculate(instructions, 10);

	return {first: first, second: second};
}