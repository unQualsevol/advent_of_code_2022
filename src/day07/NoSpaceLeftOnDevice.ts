import {Result, Solution} from "../types";

interface FileSystemObject {
	name: string;
	size: number;
}

interface Directory extends FileSystemObject {
	path: string;
	parentPath: string;
	subdirectories: string[];
}

const changeDirectoryRegex = /\$ cd (\w+|\/)/;
const directoryUpRegex = /\$ cd \.\./;
const listRegex = /\$ ls/;
const commandRegex = /^\$/;
const dirRegex = /^dir (.+)/;
const fileRegex = /^(\d+) (.+)/;

function getDirectoryName(line: string): string {
	return line.match(changeDirectoryRegex)?.[1] ?? "";
}

function skip(index: number, offset: number): number {
	return index+offset;
}

function readContent(lines: string[], index: number): {files: FileSystemObject[], directories: string[], index: number} {
	const files = [];
	const directories = [];
	let line = lines[index];
	while (!commandRegex.test(line) && index < lines.length) {
		if (fileRegex.test(line)) {
			const match = line.match(fileRegex)
			const size = match?.[1] ? Number(match?.[1]): 0;
			const name = match?.[2] ?? "";
			files.push({name: name, size: size});
		} else if (dirRegex.test(line)) {
			const match = line.match(dirRegex)
			const name = match?.[1] ?? "";
			directories.push(name);
		}
		line = lines[++index];
	}
	return {files: files, directories: directories, index: index}
}

function readDirectory(lines: string[], index: number, path: string): { directory: Directory, index: number, path: string} {
	const directoryName = getDirectoryName(lines[index]);
	const parentPath = String(path);
	path += directoryName === "/" || path === "/" ? directoryName : "/" + directoryName;
	index = skip(index, 2);
	const {files, directories, index: newIndex} = readContent(lines, index);
	index = newIndex;
	const size = files.reduce((acc, current) => {
		return acc+current.size;
		}, 0);
	return {
		directory: {
			name: directoryName,
			size: size,
			subdirectories: directories,
			parentPath: parentPath ===""? "/": parentPath,
			path:path
		},
		index: index,
		path: path
	};
}

function calculateSizeWithFolders(directory: Directory, directories: Directory[]): number {
	directory.subdirectories.reverse();
	while (directory.subdirectories?.length) {
		const subDirectoryName = directory.subdirectories.pop();
		const subDirectory = directories.find((subdirectory) => subdirectory.name === subDirectoryName && subdirectory.parentPath === directory.path);
		if(!subDirectory) continue;
		directory.size += calculateSizeWithFolders(subDirectory, directories);
	}
	return directory.size;
}

function readDirectories(input: string) {
	const lines = input.split(/\r?\n/);
	const directories: Directory[] = [];
	let path = ""
	let index = 0;
	while (index < lines.length) {
		const {directory, index: newIndex, path: newPath} = readDirectory(lines, index, path);
		path = newPath;
		directories.push(directory);
		index = newIndex;
		while (directoryUpRegex.test(lines[index]) && index < lines.length) {
			path = path.substring(0, path.lastIndexOf("/"))
			index = skip(index, 1);
		}
	}

	calculateSizeWithFolders(directories[0], directories);
	return directories;
}

function first(directories: Directory[]) {
	return directories.reduce((acc, directory) => {
		if (directory.size >= 100000) {
			return acc;
		}
		return acc + directory.size
	}, 0);
}

function second(directories: Directory[]) {
	const totalSize = 70000000;
	const requiredUpdateSpace = 30000000;
	const occupiedSpace = directories[0].size;
	const freeSpace = totalSize - occupiedSpace;
	const missingUpdateSpace = requiredUpdateSpace - freeSpace;
	const minimumSizeDirectories = directories
		.filter((directory) => directory.size >= missingUpdateSpace)
		.sort((a, b) => a.size - b.size)
	return minimumSizeDirectories[0].size;
}

export const day07: Solution = (input: string): Result => {
	const directories = readDirectories(input);
	return {first: first(directories), second: second(directories)};
}