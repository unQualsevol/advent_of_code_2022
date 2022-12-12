import {Solution} from "./types";
import {day01} from "./day01/CalorieCounting";
import {day02} from "./day02/RockPaperScissors";
import {day03} from "./day03/RucksackReorganization";

export function getSolutions(): Solution[] {
    return [day01, day02, day03]
}