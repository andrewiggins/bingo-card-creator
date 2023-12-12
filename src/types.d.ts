import { Signal as PreactSignal } from "@preact/signals";
import { DeepSignal } from "deepsignal";

declare global {
	type Signal<T = any> = PreactSignal<T>;

	interface Settings {
		title: string;
		entries: string[];
		grid: "5x5" | "36-bingo";
		freeSpace: null | {
			entry: string;
		};
		humanBingo: boolean;
	}

	type SettingsSignals = DeepSignal<Settings>;
}