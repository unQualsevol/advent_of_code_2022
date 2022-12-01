#!/usr/bin/env node
import { program } from "commander";
import * as fs from "fs";
import {getSolutions} from "./Solutions";

function getInputAsString(day: number) {
    return fs.readFileSync(`resources/input${(day < 10) ? "0" + day : day}`).toString();
}

function executeDay(day: string, part?: string) {
    const dayNumber = Number(day);
    if(dayNumber < 1 || dayNumber > 25 ) {
        throw new Error("`day` must be between 1 and 25");
    }
    const partNumber = Number(part);
    if(!isNaN(partNumber) && partNumber !== 1 && partNumber !== 2){
        throw new Error("`part` must be between 1 and 2");
    }
    getSolutions()[dayNumber-1](getInputAsString(dayNumber), partNumber);
}

program
    .command("executeDay <day> [part]")
    .action(executeDay);

program.parseAsync().catch(console.log);