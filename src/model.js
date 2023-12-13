import MurmurHash3 from "imurmurhash";
import { deepSignal } from "deepsignal";
import entries from "./entries.json";

/** @type {SettingsSignals} */
export const settings = deepSignal({
	title: "SeattleJS Holiday Party 2023",
	description:
		"Find someone who matches each description. Write their name in the box (or otherwise mark the box).",
	entries: entries,
	grid: "5x5",
	freeSpace: {
		entry: "FREE SPACE",
	},
	humanBingo: true,
	count: 100,
});

/** @type {(settings: SettingsSignals) => Settings} */
export function unsignalSettings(settings) {
	return JSON.parse(JSON.stringify(settings));
}

/** @type {(grid: Settings["grid"]) => number} */
function getGridSize(grid) {
	if (grid === "5x5") return 25;
	throw new Error(`Unknown grid: ${grid}`);
}

const defaultRng = () => Math.random();

/** @type {(settings: Settings, rng?: () => number) => Board} */
function generateBoard(settings, rng = defaultRng) {
	const boardHash = MurmurHash3();

	/** @type {Set<number>} */
	const usedIndices = new Set();
	const size = getGridSize(settings.grid);
	const freeSpaceIndex = settings.freeSpace ? Math.floor(size / 2) : -1;

	/** @type {string[]} */
	const entries = [];

	for (let j = 0; j < size; j++) {
		if (freeSpaceIndex === j) {
			entries.push(settings.freeSpace?.entry ?? "");
			continue;
		}

		let index;
		do {
			index = Math.floor(rng() * settings.entries.length);
		} while (usedIndices.has(index));

		const entry = settings.entries[index];
		entries.push(entry);
		boardHash.hash(entry);
		usedIndices.add(index);
	}

	usedIndices.clear();
	return { hash: boardHash.result().toString(16), entries, freeSpaceIndex };
}

/** @type {(settings: Settings, rng?: () => number) => Boards} */
export function generateBoards(settings, rng) {
	/** @type {Record<string, number>} */
	const duplicates = {};
	/** @type {Set<string>} */
	const boardIds = new Set();
	/** @type {Board[]} */
	const boards = [];

	for (let i = 0; i < settings.count; i++) {
		const board = generateBoard(settings, rng);
		boards.push(board);

		const id = board.hash;
		if (boardIds.has(id)) {
			duplicates[id] = (duplicates[id] ?? 1) + 1;
		}

		boardIds.add(board.hash);
	}

	if (boardIds.size !== boards.length) {
		console.log("Duplicate boards found!", duplicates);
	}

	// debugDuplicates(boardIds, boards);

	return { boards, metadata: { duplicates } };
}

/** @type {(boardIds: Set<string>, boards: Board[]) => void} */
function debugDuplicates(boardIds, boards) {
	const otherIdsArray = localStorage.getItem("duplicates")?.split(",") ?? [];
	const otherIds = new Set(otherIdsArray);

	if (otherIdsArray.length !== otherIds.size) {
		console.log("Sanity check failed. otherIds contains duplicates!");
	}

	console.log("Other duplicates size:", otherIds.size);

	let intersection = new Set([...otherIds].filter((x) => boardIds.has(x)));

	if (intersection.size > 0) {
		console.log("Duplicate boards found!", intersection);

		for (let id of intersection) {
			console.log(
				"Duplicate board:",
				boards.find((b) => b.hash === id),
			);
		}
	} else {
		console.log("No duplicates found!");
	}

	const union = new Set([...otherIds, ...boardIds]);
	localStorage.setItem("duplicates", [...union].join(","));
}
