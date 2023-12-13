import { signal } from "@preact/signals";
import { deepSignal } from "deepsignal";
import entries from "./entries.json";

/** @type {SettingsSignals} */
export const settings = deepSignal({
	title: "SeattleJS Holiday Party 2023",
	entries: entries,
	grid: "5x5",
	freeSpace: {
		entry: "FREE SPACE",
	},
	humanBingo: true,
	count: 100,
});

/** @type {(grid: Settings["grid"]) => number} */
export function gridSize(grid) {
	if (grid === "5x5") return 25;
	throw new Error(`Unknown grid: ${grid}`);
}
