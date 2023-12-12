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
});
