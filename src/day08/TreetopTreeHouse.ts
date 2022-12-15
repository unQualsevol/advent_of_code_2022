import {Result, Solution} from "../types";

function isVisible(i: number, j: number, treeMap: number[][]) {
	const testingTreeHeight = treeMap[i][j];
	if(testingTreeHeight === 0) return false;
	const row = treeMap[i];
	const leftRange = row.slice(0, j);
	const rightRange = row.slice(j+1, row.length);
	const column = treeMap.map((row) => row[j]);
	const topRange = column.slice(0, i);
	const bottomRange = column.slice(i+1, treeMap.length);
	return leftRange.every((treeHeight) => treeHeight < testingTreeHeight) ||
		rightRange.every((treeHeight) => treeHeight < testingTreeHeight) ||
		topRange.every((treeHeight) => treeHeight < testingTreeHeight) ||
		bottomRange.every((treeHeight) => treeHeight < testingTreeHeight);
}

function calculateTreeScenicScore(i: number, j: number, treeMap: number[][]) {
	const testingTreeHeight = treeMap[i][j];
	if(testingTreeHeight === 0) return 1;
	const row = treeMap[i];
	const leftRange = row.slice(0, j);
	const rightRange = row.slice(j+1, row.length);
	const column = treeMap.map((row) => row[j]);
	const topRange = column.slice(0, i);
	const bottomRange = column.slice(i+1, treeMap.length);
	let leftView = leftRange.reverse().findIndex((treeHeight) => treeHeight >= testingTreeHeight)
	leftView = leftView >= 0 ? leftView+1 : leftRange.length;
	let rightView = rightRange.findIndex((treeHeight) => treeHeight >= testingTreeHeight)
	rightView = rightView >= 0 ? rightView+1 : rightRange.length;
	let topView = topRange.reverse().findIndex((treeHeight) => treeHeight >= testingTreeHeight)
	topView = topView >= 0 ? topView+1 : topRange.length;
	let bottomView = bottomRange.findIndex((treeHeight) => treeHeight >= testingTreeHeight)
	bottomView = bottomView >= 0 ? bottomView+1 : bottomRange.length;
	return leftView * rightView * topView * bottomView;
}

export const day08: Solution = (input: string): Result => {
	const lines = input.split(/\r?\n/);
	const treeMap = lines.map((line)=> line.split("").map((value)=> Number(value)))
	const height = treeMap.length;
	const length = treeMap[0].length;
	let visibleTrees = (height+length-2)*2;
	let bestTreeScenicScore = 0;
	for (let i = 1; i < height-1; i++) {
		for (let j = 1; j < length-1; j++) {
			if(isVisible(i, j, treeMap)) {
				visibleTrees++;
			}
			bestTreeScenicScore = Math.max(bestTreeScenicScore, calculateTreeScenicScore(i, j, treeMap));
		}
	}

	return {first: visibleTrees, second: bestTreeScenicScore};
}