import { useMemo } from "preact/hooks";
import { Board } from "./Board.jsx";
import { memo } from "./memo.js";
import { generateBoards } from "./model.js";

/** @type {import('preact').FunctionComponent<{ settings: Settings, rng?: () => number }>} */
export const Boards = memo(({ settings, rng }) => {
	/** @type {Boards} */
	const boardData = useMemo(
		() => generateBoards(settings, rng),
		[settings, rng],
	);

	const boardJsx = [];
	for (let board of boardData.boards) {
		boardJsx.push(<Board key={board.hash} settings={settings} board={board} />);
	}

	return <div class="boards">{boardJsx}</div>;
});
