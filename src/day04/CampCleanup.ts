import {Result, Solution} from "../types";

interface Range {
	start: number;
	end: number;
}

interface SectionAssignment {
	first: Range;
	second: Range;
}

function fullyOverlaps(first: Range, second: Range) {
	return first.start <= second.start && first.end >= second.end ||
		second.start <= first.start && second.end >= first.end;
}

function partiallyOverlaps(first: Range, second: Range) {
	return first.start >= second.start && second.end >= first.start && second.end <= first.end ||
		first.start <= second.start && second.start <= first.end && first.end <= second.end
}


function overlaps(first: Range, second: Range) {
	return fullyOverlaps(first, second) || partiallyOverlaps(first, second);
}

export const day04: Solution = (input: string): Result => {
	const sectionAssignments: SectionAssignment[] = input.split(/\r?\n/)
		.filter(line => line)
		.map((line) => {
			const values = line.match(/(\d+)/g)?.map((value) => Number(value)) ?? [0, 0, 0, 0];
			return {first: {start: values[0], end: values[1]}, second: {start: values[2], end: values[3]}}
		});
	const first = sectionAssignments
		.filter((sectionAssignment) => fullyOverlaps(sectionAssignment.first, sectionAssignment.second)).length;
	const second = sectionAssignments
		.filter((sectionAssignment) => overlaps(sectionAssignment.first, sectionAssignment.second)).length;
	return {first, second}
}