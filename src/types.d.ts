import { Signal as PreactSignal } from "@preact/signals";
import { DeepSignal } from "deepsignal";

declare global {
	type Signal<T = any> = PreactSignal<T>;

	interface Settings {
		title: string;
		description: string;
		entries: string[];
		grid: "5x5" | "36-bingo";
		freeSpace: null | {
			entry: string;
		};
		humanBingo: boolean;
		count: number;
	}

	type SettingsSignals = DeepSignal<Settings>;

	interface Boards {
		metadata: {
			duplicates: Record<string, number>;
		};
		boards: Board[];
	}

	interface Board {
		hash: string;
		entries: string[];
		freeSpaceIndex: number;
	}
}
