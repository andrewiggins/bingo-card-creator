import { useMemo } from "preact/hooks";
import { Board } from "./Board.jsx";
import { memo } from "./memo.js";
import { gridSize } from "./model.js";

/** @type {import('preact').FunctionComponent<{ settings: Settings }>} */
export const Boards = memo(({ settings }) => {
	const arr = Array.from({ length: settings.count }, (_, i) => i);

	/** @type {string[][]} */
	const boardData = useMemo(() => {
		const size = gridSize(settings.grid);
		const usedIndices = new Set();
		const boards = [];
		for (let i = 0; i < settings.count; i++) {
			const board = [];
			for (let j = 0; j < size; j++) {
				let index;
				do {
					index = Math.floor(Math.random() * settings.entries.length);
				} while (usedIndices.has(index));
				usedIndices.add(index);
				board.push(settings.entries[index]);
			}

			usedIndices.clear();
			boards.push(board);
		}

		return boards;
	}, [settings]);

	return (
		<div class="boards">
			{arr.map((i) => {
				return (
					<Board key={i} settings={{ ...settings, entries: boardData[i] }} />
				);
			})}
		</div>
	);
});
