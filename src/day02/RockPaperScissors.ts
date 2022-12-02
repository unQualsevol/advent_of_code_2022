import {Result, Solution} from "../types";

const shapeValue:{[x:string]: number} = {
    X: 1,
    Y: 2,
    Z: 3,
}

const shapeValue2:{[x:string]: number} = {
    AX: shapeValue.Z,
    AY: shapeValue.X,
    AZ: shapeValue.Y,
    BX: shapeValue.X,
    BY: shapeValue.Y,
    BZ: shapeValue.Z,
    CX: shapeValue.Y,
    CY: shapeValue.Z,
    CZ: shapeValue.X,
}

const outcomeValues:{[x:string]: number} = {
    AX: 3,
    AY: 6,
    AZ: 0,
    BX: 0,
    BY: 3,
    BZ: 6,
    CX: 6,
    CY: 0,
    CZ: 3,
}

const outcomeValues2:{[x:string]: number} = {
    X: 0,
    Y: 3,
    Z: 6,
}

function calculateResult(game: string):number {
    const players: string[] = game.split(" ");
    return shapeValue[players[1]] + outcomeValues[players.join("")];
}

function calculateResult2(game: string):number {
    const players: string[] = game.split(" ");
    return shapeValue2[players.join("")] + outcomeValues2[players[1]];
}

export const day02: Solution = (input: string): Result =>  {
    return input
        .split(/\r?\n/)
        .reduce((acc, line) => {
            if(!line) return acc;
            return {first: acc.first + calculateResult(line), second: acc.second + calculateResult2(line)};
        }, {first: 0, second: 0});
}