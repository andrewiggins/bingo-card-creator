import { signal } from "@preact/signals";

/** @type {SettingsSignals} */
export const settings = {
	title: signal("Bingo Card Title"),
	entries: signal([]),
	grid: signal("5x5"),
	freeSpace: signal(null),
	textAlignment: signal("center"),
};
