import { Signal as PreactSignal } from "@preact/signals";

declare global {
	type Signal<T = any> = PreactSignal<T>;

	interface Settings {
		title: string;
		entries: string[];
		grid: "5x5" | "36-bingo";
		freeSpace: null | {
			entry: string;
		};
		textAlignment: "top" | "center" | "bottom";
	}

	type Signalize<T extends object> = {
		[P in keyof T]: Signal<T[P]>;
	};

	type SettingsSignals = Signalize<Settings>;
}
