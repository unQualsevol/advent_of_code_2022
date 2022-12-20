import {Result, Solution} from "../types";

const lowerACharCode = "a".charCodeAt(0);
const upperECharCode = "E".charCodeAt(0);
const upperSCharCode = "S".charCodeAt(0);

interface Coordinate {
	x: number;
	y: number;
}

function getNeighbors(coordinate: Coordinate, map: number[][]): Coordinate[] {
	const height = map.length;
	const width = map[0].length;
	const currentValue = map[coordinate.y][coordinate.x];
	const neighbors: Coordinate[]= [
		{x: coordinate.x-1,y: coordinate.y},
		{x: coordinate.x,y: coordinate.y+1},
		{x: coordinate.x,y: coordinate.y-1},
		{x: coordinate.x+1,y: coordinate.y},
	];
	return neighbors.filter((neighbor) => {
		return neighbor.x < width &&
			neighbor.x >= 0 &&
			neighbor.y < height &&
			neighbor.y >= 0 &&
			currentValue - map[neighbor.y][neighbor.x] >= -1
	});
}

function bfs(map: number[][], starts: Coordinate[], end: Coordinate): number {
	const queue = starts.map((start) => ({coordinate: start, cost: 0}));
	const visited = new Map<number, Set<number>>();
	while (queue[0].coordinate.x !== end.x || queue[0].coordinate.y !== end.y) {
		const {coordinate, cost} = queue.shift()!;
		if(visited.get(coordinate.x)?.has(coordinate.y)) {
			continue;
		}
		if(!visited.has(coordinate.x)) {
			visited.set(coordinate.x, new Set());
		}
		visited.get(coordinate.x)!.add(coordinate.y);
		queue.push(...getNeighbors(coordinate, map).map((neighbor) => ({coordinate: neighbor, cost: cost+1})));
	}
	return queue.shift()!.cost;
}

function getCoordinateByValue(map:number[][], code: number): Coordinate {
	const y = map.findIndex((line) => line.includes(code));
	const x = map[y].indexOf(code);
	return {x, y};
}

function getStart(map: number[][]): Coordinate {
	return getCoordinateByValue(map, 0);
}

function getEnd(map: number[][]): Coordinate {
	return getCoordinateByValue(map, 27);
}

function getMap(lines: string[]) {
	return lines.map((line) => line.split("").map((char) => {
		const charCode = char.charCodeAt(0);
		if (charCode >= lowerACharCode) {
			return 1 + charCode - lowerACharCode;
		}
		if (charCode === upperECharCode) {
			return 27;
		}
		return 0;
	}));
}

function getStarts(map: number[][]): Coordinate[] {
	const starts: Coordinate[] = []
	for (let i = 0; i < map.length; i++) {
		const mapLine = map[i];
		for (let j = 0; j < mapLine.length; j++) {
			if (mapLine[j] <= 1) {
				starts.push({x: j, y: i});
			}
		}
	}
	return starts;
}

export const day12: Solution = (input: string): Result => {
	const lines = input.split(/\r?\n/);
	const map = getMap(lines);
	const start = getStart(map);
	const end = getEnd(map);
	const first = bfs(map, [start], end);
	const starts:Coordinate[] = getStarts(map);
	const second = bfs(map, starts, end);
	return {first: first, second: second};
}