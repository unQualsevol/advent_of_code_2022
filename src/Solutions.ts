import {Solution} from "./Solution";
import {day01} from "./day01/CalorieCounting";
import {day02} from "./day02/RockPaperScissors";

export function getSolutions(): Solution[] {
    return [day01, day02]
}