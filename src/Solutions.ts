import {Solution} from "./types";
import {day01} from "./day01/CalorieCounting";
import {day02} from "./day02/RockPaperScissors";
import {day03} from "./day03/RucksackReorganization";
import {day04} from "./day04/CampCleanup";
import {day05} from "./day05/SupplyStacks";
import {day06} from "./day06/TuningTrouble";
import {day07} from "./day07/NoSpaceLeftOnDevice";

export function getSolutions(): Solution[] {
	return [day01, day02, day03, day04, day05, day06, day07]
}